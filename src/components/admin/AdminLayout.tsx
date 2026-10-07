import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import {
  LayoutDashboard,
  UserPlus,
  Users,
  Newspaper,
  Calendar,
  Handshake,
  MessageCircle,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Building2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  end?: boolean;
}

const navItems: NavItem[] = [
  { name: "Resumen General", href: "/admin", icon: LayoutDashboard, end: true },
  { name: "Prospectos (Leads)", href: "/admin/leads", icon: UserPlus },
  { name: "Clientes & Membresías", href: "/admin/clientes", icon: Users },
  { name: "Noticias Empresariales", href: "/admin/noticias", icon: Newspaper },
  { name: "Eventos & Webinars", href: "/admin/eventos", icon: Calendar },
  { name: "Aliados & Convenios", href: "/admin/aliados", icon: Handshake },
  { name: "WhatsApp & Alertas", href: "/admin/whatsapp", icon: MessageCircle },
];

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  // Comprobar estado de la API
  useEffect(() => {
    let isMounted = true;
    api
      .health()
      .then(() => {
        if (isMounted) setApiOnline(true);
      })
      .catch(() => {
        if (isMounted) setApiOnline(false);
      });

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans text-slate-800">
      {/* ─── SIDEBAR DESKTOP ─── */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
        {/* Brand Header */}
        <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1a4a38] text-white shadow-sm">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-tight">Centro Empresarial</h1>
            <span className="text-[11px] font-semibold text-[#1a4a38]">Panel de Control</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto p-4">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Administración
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-[#1a4a38] text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer Sidebar: User profile + Logout */}
        <div className="border-t border-slate-200 p-4">
          <div className="mb-3 flex items-center justify-between rounded-xl bg-slate-50 p-2.5">
            <div className="overflow-hidden">
              <p className="truncate text-xs font-bold text-slate-900">{user?.full_name || "Usuario"}</p>
              <span className="inline-flex items-center gap-1 rounded bg-[#1a4a38]/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-[#1a4a38]">
                <ShieldCheck className="h-2.5 w-2.5" />
                {user?.role || "Staff"}
              </span>
            </div>
            <button
              onClick={handleLogout}
              title="Cerrar sesión"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>

          <Link
            to="/"
            target="_blank"
            className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <span>Ver web pública</span>
            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
          </Link>
        </div>
      </aside>

      {/* ─── CONTENIDO Y HEADER SUPERIOR ─── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="hidden sm:block text-xs font-semibold text-slate-500">
              Gestión Integral · Centro Empresarial Ica
            </div>
          </div>

          {/* Right Header items */}
          <div className="flex items-center gap-3">
            {/* Status API Badge */}
            <div className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1 text-xs">
              {apiOnline === true ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-emerald-700">API Conectada</span>
                </>
              ) : apiOnline === false ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="font-semibold text-red-600">API Desconectada</span>
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-slate-300" />
                  <span className="text-slate-500">Verificando API...</span>
                </>
              )}
            </div>

            {/* Logout Mobile */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600 lg:hidden"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Salir</span>
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-slate-200 bg-white p-4 shadow-lg lg:hidden">
            <div className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.end}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold ${
                      isActive
                        ? "bg-[#1a4a38] text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`
                  }
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}

        {/* ─── VISTA PRINCIPAL (OUTLET) ─── */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
