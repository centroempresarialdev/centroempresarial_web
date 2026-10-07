import React, { useState } from "react";
import { whatsappService } from "@/services";
import {
  MessageCircle,
  Send,
  Bell,
  UserCheck,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldAlert,
} from "lucide-react";

export const WhatsAppAdmin: React.FC = () => {
  // 1. Envío Directo
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSendingDirect, setIsSendingDirect] = useState(false);
  const [directFeedback, setDirectFeedback] = useState<string | null>(null);

  // 2. Escaneo de Recordatorios
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any | null>(null);

  // 3. Bienvenida por ID
  const [welcomeClientId, setWelcomeClientId] = useState("");
  const [isSendingWelcome, setIsSendingWelcome] = useState(false);
  const [welcomeFeedback, setWelcomeFeedback] = useState<string | null>(null);

  const handleSendDirect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || !message.trim()) return;

    setIsSendingDirect(true);
    setDirectFeedback(null);
    try {
      await whatsappService.send(phone.trim(), message.trim());
      setDirectFeedback("✓ Mensaje encolado en el microservicio de WhatsApp con éxito.");
      setMessage("");
    } catch (err: any) {
      setDirectFeedback(`✗ ${err?.message || "Error al enviar mensaje"}`);
    } finally {
      setIsSendingDirect(false);
    }
  };

  const handleRunReminders = async (force: boolean) => {
    setIsScanning(true);
    setScanResult(null);
    try {
      const res = await whatsappService.runReminders(force);
      setScanResult(res);
    } catch (err: any) {
      setScanResult({ error: err?.message || "Error al escanear recordatorios" });
    } finally {
      setIsScanning(false);
    }
  };

  const handleSendWelcome = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!welcomeClientId.trim()) return;

    setIsSendingWelcome(true);
    setWelcomeFeedback(null);
    try {
      const res = await whatsappService.sendWelcome(Number(welcomeClientId.trim()));
      setWelcomeFeedback(`✓ Bienvenida encolada para cliente #${res.client_id}.`);
      setWelcomeClientId("");
    } catch (err: any) {
      setWelcomeFeedback(`✗ ${err?.message || "Error enviando bienvenida"}`);
    } finally {
      setIsSendingWelcome(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
          Automatizaciones & WhatsApp
        </h1>
        <p className="text-xs text-slate-500">
          Mensajería directa, recordatorios anti-bloqueo y bienvenida oficial a asociados
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Bloque 1: Mensaje Directo */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Envío de Mensaje Directo
              </h2>
              <p className="text-[11px] text-slate-500">
                A cualquier prospecto o asociado registrado
              </p>
            </div>
          </div>

          {directFeedback && (
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-semibold">
              {directFeedback}
            </div>
          )}

          <form onSubmit={handleSendDirect} className="mt-4 space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-slate-700">
                Número de Celular / WhatsApp *
              </label>
              <input
                type="text"
                required
                placeholder="51956123456 (incluir prefijo país 51)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-[#1a4a38] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-slate-700">
                Contenido del Mensaje *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Estimado asociado, le informamos sobre la renovación de su membresía..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-[#1a4a38] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSendingDirect}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1a4a38] py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#13372a] disabled:opacity-50"
            >
              {isSendingDirect ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span>Despachar Mensaje</span>
            </button>
          </form>
        </div>

        {/* Bloque 2: Automatizaciones y Recordatorios */}
        <div className="space-y-6">
          {/* Card Recordatorios */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Escaneo de Recordatorios de Vencimiento
                </h2>
                <p className="text-[11px] text-slate-500">
                  Detecta membresías por vencer a 30 días y 5 días
                </p>
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-600 leading-relaxed">
              El motor anti-bloqueo analiza la base de datos de Neon y encola mensajes
              personalizados con retardos aleatorios en el microservicio de WhatsApp.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleRunReminders(false)}
                disabled={isScanning}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#1a4a38] px-4 py-2 text-xs font-bold text-white shadow hover:bg-[#13372a] disabled:opacity-50"
              >
                {isScanning ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Clock className="h-3.5 w-3.5" />
                )}
                <span>Escanear y Enviar (Normal)</span>
              </button>

              <button
                type="button"
                onClick={() => handleRunReminders(true)}
                disabled={isScanning}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50"
              >
                <ShieldAlert className="h-3.5 w-3.5 text-amber-600" />
                <span>Forzar Re-envío</span>
              </button>
            </div>

            {scanResult && (
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs">
                {scanResult.error ? (
                  <p className="text-red-600">✗ {scanResult.error}</p>
                ) : (
                  <p className="font-semibold text-emerald-700">
                    ✓ {scanResult.status}: {scanResult.recordatorios_encolados} recordatorios
                    encolados para entrega.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Card Bienvenida */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <UserCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Mensaje de Bienvenida Oficial
                </h2>
                <p className="text-[11px] text-slate-500">
                  Plantilla de incorporación institucional por ID de cliente
                </p>
              </div>
            </div>

            {welcomeFeedback && (
              <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-semibold">
                {welcomeFeedback}
              </div>
            )}

            <form onSubmit={handleSendWelcome} className="mt-4 flex gap-2">
              <input
                type="number"
                min={1}
                required
                placeholder="ID de Cliente (ej. 1)"
                value={welcomeClientId}
                onChange={(e) => setWelcomeClientId(e.target.value)}
                className="w-40 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-[#1a4a38] focus:outline-none"
              />
              <button
                type="submit"
                disabled={isSendingWelcome}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#1a4a38] px-4 py-2 text-xs font-bold text-white shadow hover:bg-[#13372a] disabled:opacity-50"
              >
                {isSendingWelcome && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                <span>Enviar Bienvenida</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppAdmin;
