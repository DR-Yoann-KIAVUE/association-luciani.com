import { Link } from "react-router-dom";
import { Bell, ListPlus, QrCode, Receipt, Zap } from "lucide-react";

export const APP_STORE_URL = "https://apps.apple.com/fr/app/association-luciani/id6830704522";
export const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=fr.dryksphr.luciani";
export const APP_INSTALL_URL = "https://app.association-luciani.com/installer?src=site";

const highlights = [
  { icon: Zap, text: "Réservez en deux gestes" },
  { icon: ListPlus, text: "Liste d'attente automatique : inscrit(e) dès qu'une place se libère" },
  { icon: QrCode, text: "QR code d'accès à présenter à l'entrée" },
  { icon: Receipt, text: "Abonnement et factures au même endroit" },
  { icon: Bell, text: "Rappels de vos cours" },
];

const steps = [
  <>
    <strong>Scannez le QR code</strong> de votre téléphone (iPhone ou Android), ou cherchez
    « Association LUCIANI » dans votre store.
  </>,
  <>
    <strong>Installez l'application.</strong> Elle est gratuite.
  </>,
  <>
    <strong>Connectez-vous</strong> avec l'e-mail et le mot de passe de votre espace adhérent.
    Mot de passe oublié ? Un lien vous attend sur l'écran de connexion.
  </>,
];

/** Badges officiels App Store / Google Play, alignés à la même hauteur visuelle.
 *  Le PNG Google contient une marge transparente (≈ 23 % de sa hauteur) : on le rend
 *  plus haut pour que le badge visible fasse la même taille que celui d'Apple. */
export const StoreBadges = ({ appleHeight = 48, className = "" }: { appleHeight?: number; className?: string }) => {
  const googleHeight = Math.round(appleHeight * 1.3);
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${className}`}>
      <a href={APP_STORE_URL} className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
        <img src="/stores/badge-app-store-fr.svg" alt="Télécharger dans l'App Store" height={appleHeight} style={{ height: appleHeight }} className="w-auto" />
      </a>
      <a href={GOOGLE_PLAY_URL} className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
        <img src="/stores/badge-google-play-fr.png" alt="Disponible sur Google Play" height={googleHeight} style={{ height: googleHeight }} className="w-auto" />
      </a>
    </div>
  );
};

const StoreBlock = ({ label, qr, qrAlt, href, badge, badgeAlt, badgeHeight }: {
  label: string; qr: string; qrAlt: string; href: string; badge: string; badgeAlt: string; badgeHeight: number;
}) => (
  <div className="flex flex-col items-center gap-3">
    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#A12E3C]">{label}</span>
    <div className="hidden md:block bg-white rounded-xl p-2 border border-[#A12E3C]/15">
      <img src={qr} alt={qrAlt} width={160} height={160} className="w-40 h-40" />
    </div>
    <a href={href} className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A12E3C]">
      <img src={badge} alt={badgeAlt} height={badgeHeight} style={{ height: badgeHeight }} className="w-auto" />
    </a>
  </div>
);

const AppSection = () => (
  <section
    id="application"
    className="py-20 text-white"
    style={{ background: "linear-gradient(150deg, #A12E3C, #6E172C)" }}
  >
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/80 mb-4">
            Nouveau · Application officielle
          </p>
          <div className="flex items-center gap-4 mb-6">
            <img
              src="/stores/icon-512.png"
              alt=""
              aria-hidden="true"
              width={72}
              height={72}
              className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-[22%] shadow-lg flex-shrink-0"
            />
            <h2 className="text-4xl md:text-5xl font-bold font-['Poppins'] leading-tight">
              Le sport santé, dans votre poche.
            </h2>
          </div>
          <p className="text-lg text-white/85 mb-8 max-w-xl">
            Réservez vos séances, suivez votre abonnement et entrez en salle avec votre QR code,
            directement depuis votre téléphone.
          </p>
          <ul className="space-y-3 mb-10">
            {highlights.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </span>
                <span className="text-white/90 pt-1.5">{text}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-white/70">
            Application gratuite, réservée aux adhérents. Pas encore adhérent ?{" "}
            <Link to="/tarifs" className="text-white underline underline-offset-4 hover:text-white/80">
              Découvrir nos adhésions
            </Link>
          </p>
        </div>

        <div className="bg-white text-foreground rounded-2xl p-6 md:p-8 shadow-2xl">
          <h3 className="text-2xl font-bold font-['Poppins'] text-[#6E172C] mb-6">Installez l'app en 3 étapes</h3>
          <ol className="space-y-4 mb-8">
            {steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="w-7 h-7 rounded-full bg-[#A12E3C] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <span className="pt-1">{step}</span>
              </li>
            ))}
          </ol>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-border">
            <StoreBlock
              label="iPhone"
              qr="/stores/qr-app-store.svg"
              qrAlt="QR code pour télécharger l'application sur l'App Store"
              href={APP_STORE_URL}
              badge="/stores/badge-app-store-fr.svg"
              badgeAlt="Télécharger dans l'App Store"
              badgeHeight={48}
            />
            <StoreBlock
              label="Android"
              qr="/stores/qr-google-play.svg"
              qrAlt="QR code pour télécharger l'application sur Google Play"
              href={GOOGLE_PLAY_URL}
              badge="/stores/badge-google-play-fr.png"
              badgeAlt="Disponible sur Google Play"
              badgeHeight={62}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AppSection;
