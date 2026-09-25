import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { useGsapScroll } from "@/hooks/use-gsap-scroll";
import { useLenisScroll } from "@/hooks/use-lenis-scroll";

const Layout = () => {
  const location = useLocation();

  useLenisScroll();
  useGsapScroll(location.pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <div
        className="fixed left-0 top-0 z-[70] h-[3.5px] w-full origin-left scale-x-0 bg-gradient-to-r from-primary via-accent to-accent-light shadow-[0_0_10px_rgba(234,179,8,0.7)]"
        data-scroll-progress
      />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
