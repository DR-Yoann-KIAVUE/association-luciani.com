import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Gift, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoLuciani from "@/assets/logo-luciani.png";
import { LIEN_OFFRIR } from "@/config/carteCoeur";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/sport-sante", label: "Sport & Santé" },
  { href: "/pack-prevention", label: "Club Prévention" },
  { href: "/formations", label: "Formations" },
  { href: "/a-propos", label: "L'association" },
  { href: "/tarifs", label: "Tarifs & adhésion" },
  { href: "/contact", label: "Contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Ombre légère dès que la page défile.
  const [defile, setDefile] = useState(false);
  useEffect(() => {
    const suivre = () => setDefile(window.scrollY > 8);
    suivre();
    window.addEventListener("scroll", suivre, { passive: true });
    return () => window.removeEventListener("scroll", suivre);
  }, []);

  return (
    <nav aria-label="Navigation principale" className={`sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-shadow duration-300 ${defile ? "shadow-[0_6px_24px_-12px_rgba(22,22,22,0.25)]" : ""}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 h-[72px]">
          <Link to="/" className="flex items-center flex-shrink-0" aria-label="Association LUCIANI, accueil">
            <img
              src={logoLuciani}
              alt="Association LUCIANI - Prévention & Secours"
              width={540}
              height={243}
              className="w-[132px] h-auto"
            />
          </Link>

          {/* Navigation ordinateur */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`relative px-2.5 2xl:px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors after:absolute after:inset-x-2.5 after:-bottom-0.5 after:h-0.5 after:rounded-full after:transition-colors ${
                  isActive(link.href)
                    ? "text-accent after:bg-accent"
                    : "text-foreground/80 hover:text-foreground after:bg-transparent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-2">
            <a
              href="https://app.association-luciani.com/"
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground whitespace-nowrap"
            >
              Se connecter
            </a>
            <Button asChild variant="gold" size="sm">
              <a href={LIEN_OFFRIR}>
                <Gift aria-hidden="true" />
                Offrir
              </a>
            </Button>
            <Button asChild variant="cta" size="sm">
              <Link to="/essai-gratuit">Mois d'essai gratuit</Link>
            </Button>
          </div>

          {/* Mobile : action principale toujours visible, puis menu */}
          <div className="xl:hidden flex items-center gap-1">
            <Button asChild variant="cta" size="sm">
              <Link to="/essai-gratuit">Essai gratuit</Link>
            </Button>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-md hover:bg-muted transition-colors"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
            aria-controls="menu-mobile"
          >
            {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
          </div>
        </div>

        {/* Navigation mobile */}
        {isOpen && (
          <div id="menu-mobile" className="xl:hidden pb-5 border-t border-border max-h-[calc(100dvh-72px)] overflow-y-auto">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`flex min-h-12 items-center border-b border-border px-1 text-base font-medium ${
                    isActive(link.href) ? "text-accent" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-5">
                <Button asChild variant="cta" size="lg">
                  <Link to="/essai-gratuit" onClick={() => setIsOpen(false)}>
                    Mois d'essai gratuit
                  </Link>
                </Button>
                <Button asChild variant="gold" size="lg">
                  <a href={LIEN_OFFRIR} onClick={() => setIsOpen(false)}>
                    <Gift aria-hidden="true" />
                    Offrir la Carte Cœur
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="https://app.association-luciani.com/" onClick={() => setIsOpen(false)}>
                    Se connecter
                  </a>
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
