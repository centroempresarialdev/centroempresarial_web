import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useGsapScroll } from "@/hooks/use-gsap-scroll";
import { useLenisScroll } from "@/hooks/use-lenis-scroll";

const Layout = () => {
  const location = useLocation();

  useLenisScroll();
  useGsapScroll(location.pathname);

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed left-0 top-0 z-[70] h-1 w-full origin-left scale-x-0 bg-accent" data-scroll-progress />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
