import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

// Layout & Páginas Públicas del Cliente (Intactas)
import Layout from "@/components/Layout";

const Index = lazy(() => import("@/pages/Index"));
const Memberships = lazy(() => import("@/pages/Memberships"));
const Benefits = lazy(() => import("@/pages/Benefits"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const AdvisoryThesis = lazy(() => import("@/pages/AdvisoryThesis"));
const Partners = lazy(() => import("@/pages/Partners"));
const News = lazy(() => import("@/pages/News"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const PageLoader = () => (
  <div className="flex min-h-[60vh] w-full items-center justify-center">
    <div className="h-9 w-9 animate-spin rounded-full border-3 border-primary/20 border-t-primary" />
  </div>
);

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
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/membresias" element={<Memberships />} />
              <Route path="/eventos" element={<Benefits />} />
              <Route
                path="/beneficios"
                element={<Navigate to="/eventos" replace />}
              />
              <Route path="/servicios" element={<ServicesPage />} />
              <Route path="/asesoria-tesis" element={<AdvisoryThesis />} />
              <Route path="/aliados" element={<Partners />} />
              <Route path="/noticias" element={<News />} />
              <Route path="/contacto" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
