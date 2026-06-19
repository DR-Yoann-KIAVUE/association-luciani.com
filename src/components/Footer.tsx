import { Link } from "react-router-dom";
import { Heart, Mail, MapPin, Phone } from "lucide-react";
import logoBlancComplet from "@/assets/logo-blanc-complet.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Association Info */}
          <div>
            <div className="mb-4">
              <img 
                src={logoBlancComplet} 
                alt="Association LUCIANI" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Prévention cardiovasculaire et formation aux gestes de premiers
              secours à Saint-Raphaël.
            </p>
            <p className="text-xs text-primary-foreground/60">
              Fondée par Dr KIAVUE Yoann, cardiologue
            </p>
          </div>

          {/* Navigation rapide */}
          <div>
            <h3 className="font-semibold text-base mb-4 font-['Poppins']">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/sport-sante"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Sport / Santé
                </Link>
              </li>
              <li>
                <Link
                  to="/formations"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Formations
                </Link>
              </li>
              <li>
                <Link
                  to="/tarifs"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Tarifs & Adhésions
                </Link>
              </li>
              <li>
                <Link
                  to="/pack-prevention"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Club Prévention
                </Link>
              </li>
              <li>
                <a
                  href="https://association-luciani.sportigo.club/public/auth/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Sportigo - Espace membre
                </a>
              </li>
              <li>
                <a
                  href="https://app.association-luciani.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Se connecter
                </a>
              </li>
              <li>
                <a
                  href="https://app.association-luciani.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Réserver mon créneau de sport
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-base mb-4 font-['Poppins']">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
                <span className="text-primary-foreground/80">
                  87 avenue Archimède, Pôle Epsilon 3, Bât B 2ème étage, 83700 Saint-Raphaël
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
                <a
                  href="mailto:luciani.association@gmail.com"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  luciani.association@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-base mb-4 font-['Poppins']">
              Informations légales
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/mentions-legales"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  to="/politique-confidentialite"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  to="/rgpd"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  RGPD
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>
            © {new Date().getFullYear()} Association LUCIANI – Saint-Raphaël •
            Prévention cardio & premiers secours
          </p>
        </div>
      </div>
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Association LUCIANI",
            description:
              "Association de prévention cardiovasculaire et formation aux premiers secours",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Saint-Raphaël",
              addressRegion: "Var",
              addressCountry: "FR",
            },
            areaServed: "Saint-Raphaël et environs",
            founder: {
              "@type": "Person",
              name: "Dr KIAVUE Yoann",
              jobTitle: "Cardiologue",
            },
            url: "https://association-luciani.fr",
            email: "luciani.association@gmail.com",
          }),
        }}
      />
    </footer>
  );
};

export default Footer;
