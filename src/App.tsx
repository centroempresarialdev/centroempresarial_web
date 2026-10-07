import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

// Layout & Páginas Públicas del Cliente (Intactas)
import Layout from "@/components/Layout";
import AdvisoryThesis from "@/pages/AdvisoryThesis";
import Benefits from "@/pages/Benefits";
import ContactPage from "@/pages/ContactPage";
import Index from "@/pages/Index";
import Memberships from "@/pages/Memberships";
import News from "@/pages/News";
import NotFound from "@/pages/NotFound";
import Partners from "@/pages/Partners";
import ServicesPage from "@/pages/ServicesPage";

// Componentes del Dashboard Administrativo
import { AdminLogin } from "@/pages/admin/AdminLogin";
import { AdminProtectedRoute } from "@/components/admin/AdminProtectedRoute";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DashboardOverview } from "@/pages/admin/DashboardOverview";
import { LeadsAdmin } from "@/pages/admin/LeadsAdmin";
import { ClientsAdmin } from "@/pages/admin/ClientsAdmin";
import { NewsAdmin } from "@/pages/admin/NewsAdmin";
import { EventsAdmin } from "@/pages/admin/EventsAdmin";
import { PartnersAdmin } from "@/pages/admin/PartnersAdmin";
import { WhatsAppAdmin } from "@/pages/admin/WhatsAppAdmin";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* ─── RUTAS PÚBLICAS DEL CLIENTE (100% INTACTAS) ─── */}
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/membresias" element={<Memberships />} />
              <Route path="/eventos" element={<Benefits />} />
              <Route path="/beneficios" element={<Navigate to="/eventos" replace />} />
              <Route path="/servicios" element={<ServicesPage />} />
              <Route path="/asesoria-tesis" element={<AdvisoryThesis />} />
              <Route path="/aliados" element={<Partners />} />
              <Route path="/noticias" element={<News />} />
              <Route path="/contacto" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* ─── RUTAS PRIVADAS DEL DASHBOARD ADMINISTRATIVO ─── */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<DashboardOverview />} />
                <Route path="leads" element={<LeadsAdmin />} />
                <Route path="clientes" element={<ClientsAdmin />} />
                <Route path="noticias" element={<NewsAdmin />} />
                <Route path="eventos" element={<EventsAdmin />} />
                <Route path="aliados" element={<PartnersAdmin />} />
                <Route path="whatsapp" element={<WhatsAppAdmin />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
