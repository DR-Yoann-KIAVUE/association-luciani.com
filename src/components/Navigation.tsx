import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoLuciani from "@/assets/logo-luciani.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/sport-sante", label: "Sport & Santé" },
    { href: "/pack-prevention", label: "Club Prévention" },
    { href: "/formations", label: "Formations" },
    { href: "/a-propos", label: "L'association" },
    { href: "/tarifs", label: "Tarifs" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between h-30">
          {/* Logo - aligné à gauche */}
          <Link to="/" className="flex items-center group">
            <img
              src={logoLuciani}
              alt="Association LUCIANI - Prévention & Secours"
              className="w-[180px] h-auto transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href) ? "bg-secondary text-secondary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Desktop - plus compacts */}
          <div className="hidden lg:flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <a href="https://app.association-luciani.com/" target="_blank" rel="noopener noreferrer" className="text-xs">
                Se connecter
              </a>
            </Button>
            <Button asChild variant="gold" size="sm">
              <Link to="/tarifs" className="text-xs">
                Adhérer
              </Link>
            </Button>
            <Button asChild variant="cta" size="sm">
              <Link to="/essai-gratuit" className="text-xs">
                Mois d'essai gratuit
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-in slide-in-from-top">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href) ? "bg-secondary text-secondary-foreground" : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-2">
                <Button asChild variant="outline" size="lg">
                  <a href="https://app.association-luciani.com/" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                    Se connecter
                  </a>
                </Button>
                <Button asChild variant="gold" size="lg">
                  <Link to="/tarifs" onClick={() => setIsOpen(false)}>
                    Adhérer
                  </Link>
                </Button>
                <Button asChild variant="cta" size="lg">
                  <Link to="/essai-gratuit" onClick={() => setIsOpen(false)}>
                    Mois d'essai gratuit
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
