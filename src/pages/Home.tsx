import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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

const Home = () => {
  const reperes = [
    { titre: "Fondée par un cardiologue", texte: "Le Dr Yoann Kiavue préside l'association et ses actions de prévention." },
    { titre: "Coachs et formateurs diplômés", texte: "Chaque séance est encadrée et adaptée à votre niveau." },
    { titre: "À Saint-Raphaël, toute la semaine", texte: "Des cours du lundi au vendredi, en salle et en plein air." },
    { titre: "Un mois d'essai gratuit", texte: "Tous les cours et le Club Prévention, sans engagement." },
  ];

  const poles = [
    {
      titre: "Sport & Santé",
      texte: "Cours collectifs encadrés par des coachs diplômés pour renforcer votre cœur.",
      lien: "/sport-sante",
      couleur: "hsl(var(--sport-accent))",
      image: sportImage,
      alt: "Cours collectif de sport santé encadré par un coach",
    },
    {
      titre: "Club Prévention",
      texte: "Webinaires, conférences et newsletter pour vous informer et prévenir.",
      lien: "/pack-prevention",
      couleur: "hsl(var(--accent-gold))",
      image: preventionImage,
      alt: "Conférence de prévention cardiovasculaire",
    },
    {
      titre: "Formations Premiers Secours",
      texte: "Alerter, masser, défibriller : apprenez les gestes qui sauvent avec nos formateurs diplômés.",
      lien: "/formations",
      couleur: "hsl(var(--secondary))",
      image: formationsImage,
      alt: "Initiation au massage cardiaque sur mannequin",
    },
  ];

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APPLICATION) }} />

      {/* En-tête */}
      <section data-hero className="relative overflow-hidden text-white" style={{ backgroundColor: "hsl(354 51% 59%)" }}>
        <img
          src={plageImage}
          alt="Cours de sport santé en plein air, en bord de mer"
          width={2048}
          height={1152}
          decoding="async"
          className="photo-hero"
        />
        <FondVivant ton="rouge" />
        <div className="relative container mx-auto px-4 py-20 md:py-28 lg:py-36">
          <div className="min-w-0 max-w-2xl" data-cascade>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/85">
              Prévention cardiovasculaire · Saint-Raphaël
            </p>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05]">
              Bouger pour protéger votre cœur
            </h1>
            <p className="mt-6 text-lg md:text-xl leading-relaxed text-white/95">
              Portée par le Dr KIAVUE Yoann, cardiologue, l'Association LUCIANI s'engage à Saint-Raphaël
              pour un cœur en meilleure santé, grâce au sport, à la prévention et à la formation aux gestes qui sauvent.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Button asChild variant="clair" size="lg">
                <Link to="/essai-gratuit">
                  Essayer gratuitement pendant 1 mois
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="contour" size="lg">
                <a href="#planning">Voir le planning des cours</a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-white/85">Sans engagement. Tous les cours et le Club Prévention inclus.</p>

            {/* Application mobile */}
            <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <a href="#application" className="text-sm font-medium text-white hover:underline underline-offset-4">
                Nouveau : l'application Association LUCIANI
              </a>
              <StoreBadges appleHeight={40} />
            </div>
          </div>
        </div>
      </section>

      {/* Repères */}
      <section className="border-b border-border bg-background">
        <div className="container mx-auto px-4">
          <dl className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-border">
            {reperes.map((repere) => (
              <div key={repere.titre} className="py-6 lg:py-8 lg:px-6 first:lg:pl-0 last:lg:pr-0">
                <dt className="font-semibold text-foreground">{repere.titre}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{repere.texte}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Nos pôles */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-texte">Nos actions</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-primary">Nos pôles d'action</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Trois approches complémentaires pour votre santé cardiovasculaire
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 lg:gap-8">
            {poles.map((pole) => (
              <Link
                key={pole.lien}
                to={pole.lien}
                className="carte-vivante group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--card-shadow)]"
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
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold text-primary">{pole.titre}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">{pole.texte}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-texte">
                    Découvrir
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trouver mon cours */}
      <section className="pb-20 md:pb-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-texte">En 30 secondes</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-primary">Trouvez le cours fait pour vous</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Trois questions, et nous vous proposons les séances adaptées à votre objectif et à vos horaires.
            </p>
          </div>
          <div className="mt-10">
            <TrouverMonCours />
          </div>
        </div>
      </section>

      {/* Planning */}
      <section id="planning" className="scroll-mt-24 pb-20 md:pb-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-texte">Cette semaine</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-primary">
              Planning des cours de sport & santé
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">Rejoignez un cours cette semaine</p>
          </div>

          <div className="mt-10">
            <Planning />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
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
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center rounded-2xl border border-border p-8 md:p-12">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-texte">Mois d'essai gratuit</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-primary">
                Testez tous les cours et le Club Prévention pendant 1 mois
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Découvrez l'ensemble de notre programmation Sport & Santé, sans engagement.
              </p>
              <Button asChild variant="cta" size="lg" className="mt-8 w-full sm:w-auto">
                <Link to="/essai-gratuit">
                  Commencer mon essai gratuit
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <ul className="space-y-4">
              {["Accès illimité pendant 1 mois", "Tous les cours disponibles", "Sans engagement"].map((point) => (
                <li key={point} className="flex items-center gap-3 border-b border-border pb-4 last:border-0 last:pb-0">
                  <CheckCircle2 aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-accent-texte" />
                  <span className="font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Le fondateur */}
      <section className="py-20 md:py-24 bg-muted/60">
        <div className="container mx-auto px-4">
          <figure className="mx-auto max-w-3xl text-center">
            <blockquote className="text-xl md:text-2xl font-light leading-relaxed text-primary">
              « Notre engagement : agir concrètement pour réduire la mortalité cardiovasculaire. Prévenir, former, sensibiliser, accompagner — parce que chaque battement compte, et que la santé du cœur doit être une cause partagée par tous. »
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
                <p className="font-semibold text-foreground">Dr KIAVUE Yoann</p>
                <p className="text-sm text-muted-foreground">Cardiologue, fondateur de l'Association LUCIANI</p>
              </div>
            </figcaption>
            <Link to="/a-propos" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-texte hover:underline underline-offset-4">
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
      <section className="py-20 md:py-24 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-texte">Entreprises, écoles, associations</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-primary">Sensibiliser, c'est sauver des vies</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Nous organisons des sessions de formation en entreprise, à l'école et auprès d'autres associations.
                Intervention sur Saint-Raphaël, Fréjus et alentours.
              </p>
            </div>
            <Button asChild variant="outline" size="lg" className="flex-shrink-0">
              <Link to="/formations">
                Découvrir notre programme de formation
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
