const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ASSETS_DIR = path.resolve(__dirname, '../src/assets');
const CACHE_FILE = path.resolve(__dirname, '../node_modules/.asset-optimizer-cache.json');
const SIZE_THRESHOLD_BYTES = 300 * 1024; // 300 KB

function loadCache() {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    }
  } catch {}
  return {};
}

function saveCache(cache) {
  try {
    const dir = path.dirname(CACHE_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache));
  } catch {}
}

function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      getFiles(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function run() {
  const cache = loadCache();
  const allFiles = getFiles(ASSETS_DIR);
  const candidates = allFiles.filter((f) => {
    if (!/\.(png|jpe?g)$/i.test(f)) return false;
    try {
      const stat = fs.statSync(f);
      if (cache[f] && cache[f] === stat.mtimeMs) return false;
      return stat.size > SIZE_THRESHOLD_BYTES;
    } catch {
      return false;
    }
  });

  if (candidates.length === 0) {
    return;
  }

  console.log(`\n⚡ [optimizador] ${candidates.length} imagen(es) superan los 300KB. Optimizando...`);

  let totalSaved = 0;

  for (const file of candidates) {
    const stat = fs.statSync(file);
    const originalSize = stat.size;
    const ext = path.extname(file).toLowerCase();

    try {
      const inputBuffer = fs.readFileSync(file);
      const metadata = await sharp(inputBuffer).metadata();
      let pipeline = sharp(inputBuffer);

      const isCardPng = file.includes('Membresia') && ext === '.png';
      const maxWidth = isCardPng ? 750 : 1400;

      if (metadata.width && metadata.width > maxWidth) {
        pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
      }

      let buffer;
      if (ext === '.png') {
        buffer = await pipeline
          .png({ quality: 80, compressionLevel: 9, palette: true })
          .toBuffer();
      } else {
        buffer = await pipeline
          .jpeg({ quality: 82, mozjpeg: true })
          .toBuffer();
      }

      if (buffer.length < originalSize) {
        fs.writeFileSync(file, buffer);
        const saved = originalSize - buffer.length;
        totalSaved += saved;
        console.log(`  ✓ ${path.basename(file)}: ${(originalSize / 1024).toFixed(0)}KB -> ${(buffer.length / 1024).toFixed(0)}KB`);
      }
      cache[file] = fs.statSync(file).mtimeMs;
    } catch (err) {
      console.warn(`  ⚠ No se pudo optimizar ${path.basename(file)}:`, err.message);
    }
  }

  saveCache(cache);

  if (totalSaved > 0) {
    console.log(`✨ Ahorro total de activos: ${(totalSaved / 1024 / 1024).toFixed(2)} MB\n`);
  }
}

run().catch((err) => {
  console.error('[optimizador] Error:', err);
});
