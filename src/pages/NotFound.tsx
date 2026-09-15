import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-muted/35 px-5 pb-14 pt-28 sm:px-6 md:pb-20 md:pt-36">
      <div className="max-w-xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">404</p>
        <h1 className="mt-4 text-4xl font-extrabold text-corporate md:text-6xl">Pagina no encontrada</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          La ruta solicitada no existe o fue movida dentro de la nueva estructura del sitio.
        </p>
        <Button asChild variant="corporate" size="lg" className="mt-8">
          <Link to="/">Volver al inicio</Link>
        </Button>
      </div>
    </section>
  );
};

export default NotFound;
