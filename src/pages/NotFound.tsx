import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-primary font-['Poppins']">404</h1>
        <p className="mb-8 text-xl text-muted-foreground">Page introuvable</p>
        <a href="/" className="text-accent underline hover:text-accent/80 font-medium">
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
};

export default NotFound;
