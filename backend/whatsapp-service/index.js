const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const { default: PQueue } = require('p-queue');

const app = express();
app.use(express.json());

const INTERNAL_TOKEN = process.env.INTERNAL_WHATSAPP_TOKEN || "ce_internal_secret_token_wa_9981";

// Cola de 1 en 1 para evitar detección de comportamiento no humano
const queue = new PQueue({ concurrency: 1 });

const fs = require('fs');
const path = require('path');

// Limpiar archivos de bloqueo residuales de Chromium al reiniciar contenedor de forma recursiva
function removeStaleLocks(dir) {
    if (!fs.existsSync(dir)) return;
    try {
        const entries = fs.readdirSync(dir);
        for (const entry of entries) {
            const fullPath = path.join(dir, entry);
            try {
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    removeStaleLocks(fullPath);
                } else if (entry.startsWith('Singleton') || entry === 'DevToolsActivePort') {
                    fs.unlinkSync(fullPath);
                    console.log(`[WhatsApp] Lock residual eliminado: ${entry}`);
                }
            } catch (e) {}
        }
    } catch (e) {}
}

removeStaleLocks(path.join(__dirname, 'whatsapp-session'));

const puppeteerArgs = {
    headless: true,
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--disable-gpu'
    ]
};
if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    puppeteerArgs.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
}

const client = new Client({
    authStrategy: new LocalAuth({ dataPath: './whatsapp-session' }),
    puppeteer: puppeteerArgs
});

const QRCode = require('qrcode');
let latestQrDataUrl = null;
let isReady = false;

client.on('qr', async (qr) => {
    try {
        latestQrDataUrl = await QRCode.toDataURL(qr, { margin: 2, scale: 8 });
    } catch (e) {
        console.error('[WhatsApp] Error convirtiendo QR a imagen:', e.message);
    }
    console.log('\n[WhatsApp] ESCANEA ESTE CÓDIGO QR (O abre en navegador: http://localhost:3001/qr):');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    isReady = true;
    latestQrDataUrl = null;
    console.log('[WhatsApp] Sesión iniciada con éxito. Microservicio listo.');
});

// Endpoint público en navegador para escanear el QR sin distorsión de terminal
app.get('/qr', (req, res) => {
    if (isReady) {
        return res.send(`
            <html>
                <body style="font-family:system-ui;display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;margin:0;background:#0f172a;color:white;">
                    <div style="background:#1e293b;padding:32px 48px;border-radius:16px;text-align:center;box-shadow:0 10px 25px rgba(0,0,0,0.5);">
                        <h1 style="color:#22c55e;margin:0 0 12px 0;">WhatsApp Conectado</h1>
                        <p style="color:#94a3b8;margin:0;">El microservicio ya tiene una sesión activa y está listo para despachar recordatorios.</p>
                    </div>
                </body>
            </html>
        `);
    }

    if (!latestQrDataUrl) {
        return res.send(`
            <html>
                <head><meta http-equiv="refresh" content="3"></head>
                <body style="font-family:system-ui;display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;margin:0;background:#0f172a;color:white;">
                    <h2>Generando código QR...</h2>
                    <p style="color:#94a3b8;">Espera unos segundos mientras Chromium inicia WhatsApp Web.</p>
                </body>
            </html>
        `);
    }

    res.send(`
        <html>
            <head>
                <title>Vincular WhatsApp — Centro Empresarial</title>
                <meta http-equiv="refresh" content="20">
            </head>
            <body style="font-family:system-ui;display:flex;flex-direction:column;justify-content:center;align-items:center;min-height:100vh;margin:0;background:#0f172a;color:white;">
                <h2 style="margin:0 0 8px 0;">Vincular WhatsApp</h2>
                <p style="color:#94a3b8;margin:0 0 24px 0;">WhatsApp > Dispositivos vinculados > Vincular un dispositivo</p>
                <div style="background:white;padding:24px;border-radius:20px;box-shadow:0 15px 35px rgba(0,0,0,0.6);">
                    <img src="${latestQrDataUrl}" style="width:300px;height:300px;display:block;" alt="Código QR de WhatsApp" />
                </div>
                <p style="color:#64748b;font-size:13px;margin-top:20px;">Esta pantalla se actualiza automáticamente si el código expira.</p>
            </body>
        </html>
    `);
});

// Middleware de autenticación interna con token para APIs protegidas
app.use((req, res, next) => {
    const token = req.headers['x-internal-token'];
    if (!token || token !== INTERNAL_TOKEN) {
        return res.status(403).json({ error: 'Acceso no autorizado al servicio de WhatsApp' });
    }
    next();
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

app.post('/api/send-message', async (req, res) => {
    const { phone, message } = req.body;
    if (!phone || !message) {
        return res.status(400).json({ error: 'phone y message son campos requeridos' });
    }

    // Normalizar a número internacional Perú (51 + número)
    const cleanDigits = phone.replace(/\D/g, '');
    const formattedNumber = cleanDigits.startsWith('51') ? cleanDigits : '51' + cleanDigits;
    const defaultChatId = `${formattedNumber}@c.us`;

    queue.add(async () => {
        try {
            // 1. Jitter aleatorio humano (entre 5 y 15 segundos)
            const jitterMs = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;
            console.log(`[WhatsApp] Procesando mensaje para ${formattedNumber}. Esperando retardo de ${Math.round(jitterMs / 1000)}s...`);
            await sleep(jitterMs);

            // 2. Resolver destinatario mediante getNumberId para mapear JID / LID correctamente
            let targetId = defaultChatId;
            try {
                const numberDetails = await client.getNumberId(formattedNumber);
                if (numberDetails && numberDetails._serialized) {
                    targetId = numberDetails._serialized;
                    console.log(`[WhatsApp] Destinatario verificado en WhatsApp: ${targetId}`);
                } else {
                    console.warn(`[WhatsApp] Advertencia: ${formattedNumber} no figura registrado en WhatsApp.`);
                }
            } catch (lookupErr) {
                console.warn(`[WhatsApp] No se pudo resolver getNumberId para ${formattedNumber}: ${lookupErr.message}`);
            }

            // 3. Simular presencia de escritura solo si el chat existe en caché (no bloqueante)
            try {
                const chat = await client.getChatById(targetId);
                if (chat) {
                    await chat.sendStateTyping();
                    await sleep(2000);
                    await chat.clearState();
                }
            } catch (typingErr) {
                // Si el chat es nuevo y aún no existe en caché local, se ignora y se envía directo
            }

            // 4. Enviar mensaje directo
            await client.sendMessage(targetId, message);
            console.log(`[WhatsApp] Mensaje enviado satisfactoriamente a: ${targetId}`);
        } catch (err) {
            console.error(`[WhatsApp] Error enviando mensaje a ${formattedNumber}:`, err.message || err);
        }
    });

    return res.status(202).json({
        status: 'EN_COLA',
        message: 'Mensaje aceptado en cola con retardo anti-baneo'
    });
});

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`[WhatsApp Service] Escuchando en http://0.0.0.0:${PORT}`);
    client.initialize();
});
