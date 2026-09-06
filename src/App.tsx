import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import Benefits from "@/pages/Benefits";
import ContactPage from "@/pages/ContactPage";
import Index from "@/pages/Index";
import Memberships from "@/pages/Memberships";
import NotFound from "@/pages/NotFound";
import Partners from "@/pages/Partners";
import ServicesPage from "@/pages/ServicesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/membresias" element={<Memberships />} />
            <Route path="/eventos" element={<Benefits />} />
            <Route path="/beneficios" element={<Navigate to="/eventos" replace />} />
            <Route path="/servicios" element={<ServicesPage />} />
            <Route path="/aliados" element={<Partners />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
