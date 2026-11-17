import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import logoBlancComplet from "@/assets/logo-blanc-complet.png";
import { StoreBadges, APP_INSTALL_URL } from "@/components/AppSection";

const SITE = "https://www.association-luciani.fr";

const DONNEES_STRUCTUREES = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["NGO", "LocalBusiness"],
      "@id": `${SITE}/#association`,
      name: "Association LUCIANI",
      description: "Association de prévention cardiovasculaire, de sport santé et de formation aux premiers secours",
      url: SITE,
      logo: `${SITE}/apple-touch-icon.png`,
      image: `${SITE}/partage.jpg`,
      email: "luciani.association@gmail.com",
      telephone: "+33630196986",
      address: {
        "@type": "PostalAddress",
        streetAddress: "87 avenue Archimède, Pôle Epsilon 3, Bât B",
        postalCode: "83700",
        addressLocality: "Saint-Raphaël",
        addressRegion: "Var",
        addressCountry: "FR",
      },
      areaServed: ["Saint-Raphaël", "Fréjus", "Var"],
      founder: {
        "@type": "Person",
        "@id": `${SITE}/a-propos#fondateur`,
        name: "Dr KIAVUE Yoann",
        jobTitle: "Cardiologue",
        worksFor: {
          "@type": "MedicalClinic",
          name: "Clinique Cardiovasculaire Raphaëloise",
          url: "https://www.clinique-cardiovasculaire-raphaeloise.fr/",
        },
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#site`,
      url: SITE,
      name: "Association LUCIANI",
      inLanguage: "fr-FR",
      publisher: { "@id": `${SITE}/#association` },
    },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Association Info */}
          <div>
            <div className="mb-4">
              <img 
                src={logoBlancComplet}
                alt="Association LUCIANI"
                width={540}
                height={243}
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
            <div className="mt-6">
              <p className="text-sm font-semibold mb-3">Notre application</p>
              <StoreBadges appleHeight={40} />
            </div>
          </div>

          {/* Navigation rapide */}
          <div>
            <h3 className="font-semibold text-base mb-4">
              Navigation
            </h3>
            <ul className="text-sm">
              <li>
                <Link
                  to="/sport-sante"
                  className="inline-flex min-h-9 items-center text-primary-foreground/75 hover:text-primary-foreground transition-colors"
                >
                  Sport / Santé
                </Link>
              </li>
              <li>
                <Link
                  to="/formations"
                  className="inline-flex min-h-9 items-center text-primary-foreground/75 hover:text-primary-foreground transition-colors"
                >
                  Formations
                </Link>
              </li>
              <li>
                <Link
                  to="/tarifs"
                  className="inline-flex min-h-9 items-center text-primary-foreground/75 hover:text-primary-foreground transition-colors"
                >
                  Tarifs & Adhésions
                </Link>
              </li>
              <li>
                <Link
                  to="/pack-prevention"
                  className="inline-flex min-h-9 items-center text-primary-foreground/75 hover:text-primary-foreground transition-colors"
                >
                  Club Prévention
                </Link>
              </li>
              <li>
                <Link
                  to="/a-propos"
                  className="inline-flex min-h-9 items-center text-primary-foreground/75 hover:text-primary-foreground transition-colors"
                >
                  L'association
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="inline-flex min-h-9 items-center text-primary-foreground/75 hover:text-primary-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="https://app.association-luciani.com/login"
                  className="inline-flex min-h-9 items-center text-primary-foreground/75 hover:text-primary-foreground transition-colors"
                >
                  Espace membre
                </a>
              </li>
              <li>
                <a
                  href="https://app.association-luciani.com/"
                  className="inline-flex min-h-9 items-center text-primary-foreground/75 hover:text-primary-foreground transition-colors"
                >
                  Réserver mon créneau de sport
                </a>
              </li>
              <li>
                <a
                  href={APP_INSTALL_URL}
                  className="inline-flex min-h-9 items-center text-primary-foreground/75 hover:text-primary-foreground transition-colors"
                >
                  Télécharger l'application
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-base mb-4">
              Contact
            </h3>
            <ul className="text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-foreground/50" aria-hidden="true" />
                <span className="text-primary-foreground/75 py-2">
                  87 avenue Archimède, Pôle Epsilon 3, Bât B 2ème étage, 83700 Saint-Raphaël
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-foreground/50" aria-hidden="true" />
                <a
                  href="tel:+33630196986"
                  className="inline-flex min-h-9 items-center text-primary-foreground/75 hover:text-primary-foreground transition-colors"
                >
                  06 30 19 69 86
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-foreground/50" aria-hidden="true" />
                <a
                  href="mailto:luciani.association@gmail.com"
                  className="inline-flex min-h-9 items-center text-primary-foreground/75 hover:text-primary-foreground transition-colors"
                >
                  luciani.association@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-base mb-4">
              Informations légales
            </h3>
            <ul className="text-sm">
              <li>
                <Link
                  to="/mentions-legales"
                  className="inline-flex min-h-9 items-center text-primary-foreground/75 hover:text-primary-foreground transition-colors"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  to="/politique-confidentialite"
                  className="inline-flex min-h-9 items-center text-primary-foreground/75 hover:text-primary-foreground transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  to="/rgpd"
                  className="inline-flex min-h-9 items-center text-primary-foreground/75 hover:text-primary-foreground transition-colors"
                >
                  RGPD
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/15 mt-10 pt-8 text-center text-sm text-primary-foreground/60">
          <p>
            © {new Date().getFullYear()} Association LUCIANI – Saint-Raphaël · Prévention cardio & premiers secours
          </p>
        </div>
      </div>
      
      {/* Données structurées : l'association et le site */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(DONNEES_STRUCTUREES) }} />
    </footer>
  );
};

export default Footer;
