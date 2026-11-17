import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, CheckCircle2, HeartPulse, MapPin } from "lucide-react";
import FondVivant from "@/components/FondVivant";
import Planning from "@/components/Planning";
import TrouverMonCours from "@/components/TrouverMonCours";
import sportImage from "@/assets/illustration-sport.jpg";
import plageImage from "@/assets/illustration-plage.jpg";
import formationsImage from "@/assets/illustration-secours.jpg";
import preventionImage from "@/assets/illustration-conference.jpg";
import coachYoann from "@/assets/coach-yoann.png";
import AppSection, { StoreBadges } from "@/components/AppSection";
import CarteCoeurSection from "@/components/CarteCoeurSection";
import Titre from "@/components/Titre";

const APPLICATION = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "Association LUCIANI",
  operatingSystem: "iOS, Android",
  applicationCategory: "HealthApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  installUrl: [
    "https://apps.apple.com/fr/app/association-luciani/id6830704522",
    "https://play.google.com/store/apps/details?id=fr.dryksphr.luciani",
  ],
  publisher: { "@id": "https://www.association-luciani.fr/#association" },
};

const reperes = [
  { icone: Award, texte: "Formateurs et coachs diplômés" },
  { icone: MapPin, texte: "Actions locales à Saint-Raphaël" },
  { icone: HeartPulse, texte: "Actions menées par notre président, cardiologue" },
];

const poles = [
  {
    titre: "Sport & Santé",
    texte: "Cours collectifs encadrés par des coachs diplômés pour renforcer votre cœur.",
    lien: "/sport-sante",
    bouton: "sport" as const,
    couleur: "hsl(var(--sport-accent))",
    image: sportImage,
    alt: "Cours collectif de sport santé encadré par un coach",
  },
  {
    titre: "Club Prévention",
    texte: "Webinaires, conférences et newsletter pour vous informer et prévenir.",
    lien: "/pack-prevention",
    bouton: "gold" as const,
    couleur: "hsl(var(--accent-gold))",
    image: preventionImage,
    alt: "Conférence de prévention cardiovasculaire",
  },
  {
    titre: "Formations Premiers Secours",
    texte: "Alerter, masser, défibriller : apprenez les gestes qui sauvent avec nos formateurs diplômés.",
    lien: "/formations",
    bouton: "secondary" as const,
    couleur: "hsl(var(--secondary))",
    image: formationsImage,
    alt: "Initiation au massage cardiaque sur mannequin",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APPLICATION) }} />

      {/* En-tête : plein écran, texte centré */}
      <section
        data-hero
        className="relative flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden text-white"
        style={{ backgroundColor: "hsl(354 51% 59%)" }}
      >
        <img
          src={plageImage}
          alt="Cours de sport santé en plein air, en bord de mer"
          width={2000}
          height={1131}
          decoding="async"
          className="photo-fond"
        />
        <FondVivant ton="rouge" />
        <div className="relative container mx-auto px-4 py-16 md:py-20 text-center">
          <div className="mx-auto max-w-4xl" data-cascade>
            <h1 className="text-[2.6rem] sm:text-6xl lg:text-7xl font-semibold leading-[1.04]">
              Bouger pour protéger votre cœur
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-white/95">
              Portée par le Dr KIAVUE Yoann, cardiologue, l'Association LUCIANI s'engage à Saint-Raphaël pour un cœur
              en meilleure santé, grâce au sport, à la prévention et à la formation aux gestes qui sauvent.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3">
              <Button asChild variant="sport" size="lg">
                <Link to="/sport-sante">Découvrir Sport & Santé</Link>
              </Button>
              <Button asChild variant="gold" size="lg">
                <Link to="/pack-prevention">Découvrir le Club Prévention</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link to="/formations">Découvrir nos formations</Link>
              </Button>
            </div>

            {/* Encart d'essai gratuit */}
            <Link
              to="/essai-gratuit"
              className="encart-essai group mx-auto mt-6 flex max-w-xl items-center justify-center gap-3 rounded-xl bg-white px-6 py-5 text-lg md:text-xl font-semibold text-accent-texte shadow-[0_18px_40px_-18px_rgba(4,31,73,0.55)]"
            >
              Envie de tester gratuitement pendant 1 mois ?
              <ArrowRight aria-hidden="true" className="h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>

            {/* Application mobile */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
              <a href="#application" className="text-sm font-medium text-white hover:underline underline-offset-4">
                Nouveau : l'application Association LUCIANI
              </a>
              <StoreBadges appleHeight={40} />
            </div>
          </div>
        </div>
      </section>

      {/* Repères */}
      <section data-hero className="bg-secondary text-primary">
        <div className="container mx-auto px-4 py-6">
          <ul className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-12 gap-y-3 text-center font-semibold">
            {reperes.map(({ icone: Icone, texte }) => (
              <li key={texte} className="flex items-center gap-2.5">
                <Icone aria-hidden="true" className="h-5 w-5 flex-shrink-0" />
                {texte}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Nos pôles */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <Titre titre="Nos pôles d'action" texte="Trois approches complémentaires pour votre santé cardiovasculaire" />

          <div className="mt-12 grid md:grid-cols-3 gap-6 lg:gap-8">
            {poles.map((pole) => (
              <article
                key={pole.lien}
                className="carte-vivante group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--card-shadow)]"
              >
                <div className="h-1.5" style={{ backgroundColor: pole.couleur }} />
                <div className="aspect-[3/2] overflow-hidden bg-muted">
                  <img
                    src={pole.image}
                    alt={pole.alt}
                    width={600}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 text-center">
                  <h3 className="text-xl font-semibold text-primary">{pole.titre}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">{pole.texte}</p>
                  <Button asChild variant={pole.bouton} className="mt-6 w-full">
                    <Link to={pole.lien}>
                      Découvrir
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trouver mon cours */}
      <section className="py-20 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <Titre
            surtitre="En 30 secondes"
            titre="Trouvez le cours fait pour vous"
            texte="Trois questions, et nous vous proposons les séances adaptées à votre objectif et à vos horaires."
          />
          <div className="mx-auto mt-10 max-w-5xl">
            <TrouverMonCours />
          </div>
        </div>
      </section>

      {/* Planning */}
      <section id="planning" className="scroll-mt-24 py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <Titre titre="Planning des cours de sport & santé" texte="Rejoignez un cours cette semaine" />

          <div className="mt-10">
            <Planning />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild variant="cta" size="lg">
              <Link to="/essai-gratuit">
                Essayer gratuitement pendant 1 mois
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/sport-sante">En savoir plus sur Sport & Santé</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Essai gratuit */}
      <section className="py-20 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <Titre
            titre="Testez tous les cours et le Club Prévention pendant 1 mois"
            texte="Accédez à tous nos cours sans engagement"
          />
          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border-2 border-accent bg-card shadow-[var(--card-shadow-hover)]">
            <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
              {["Accès illimité pendant 1 mois", "Tous les cours disponibles", "Sans engagement"].map((point) => (
                <p key={point} className="flex items-center justify-center gap-3 p-6 text-center font-medium">
                  <CheckCircle2 aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-accent-texte" />
                  {point}
                </p>
              ))}
            </div>
            <div className="border-t border-border p-6 md:p-8 text-center">
              <Button asChild variant="cta" size="lg" className="w-full sm:w-auto">
                <Link to="/essai-gratuit">
                  Commencer mon essai gratuit
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Le fondateur */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <figure className="mx-auto max-w-3xl text-center">
            <blockquote className="text-xl md:text-2xl font-light leading-relaxed text-primary">
              « Notre engagement : agir concrètement pour réduire la mortalité cardiovasculaire. Prévenir, former,
              sensibiliser, accompagner — parce que chaque battement compte, et que la santé du cœur doit être une
              cause partagée par tous. »
            </blockquote>
            <figcaption className="mt-8 flex items-center justify-center gap-4 text-left">
              <img
                src={coachYoann}
                alt="Dr KIAVUE Yoann, cardiologue et fondateur"
                width={56}
                height={56}
                loading="lazy"
                decoding="async"
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-primary">Dr KIAVUE Yoann</p>
                <p className="text-sm text-muted-foreground">Cardiologue, fondateur de l'Association LUCIANI</p>
              </div>
            </figcaption>
            <Link
              to="/a-propos"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent-texte hover:underline underline-offset-4"
            >
              Découvrir l'association
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </figure>
        </div>
      </section>

      {/* La Carte Cœur */}
      <CarteCoeurSection />

      {/* Notre application */}
      <AppSection />

      {/* Entreprises */}
      <section className="bg-jaune text-jaune-foreground">
        <div className="container mx-auto px-4 py-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">Sensibiliser, c'est sauver des vies</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed">
            Nous organisons des sessions de formation en entreprise, à l'école et auprès d'autres associations.
            Intervention sur Saint-Raphaël, Fréjus et alentours.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link to="/formations">
              Découvrir notre programme de formation
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
