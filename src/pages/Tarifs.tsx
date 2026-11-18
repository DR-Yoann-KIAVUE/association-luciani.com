import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, LifeBuoy, Mail, MessagesSquare, Mic, Video } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import CarteCoeurSection from "@/components/CarteCoeurSection";
import CarteAdhesion from "@/components/CarteAdhesion";
import Parrainage from "@/components/Parrainage";
import Photo from "@/components/Photo";
import Titre from "@/components/Titre";
import { ADHESIONS, LIEN_ESSAI } from "@/config/adhesions";


const clubPrevention = [
  { icone: Video, texte: "4 webinaires thématiques par an" },
  { icone: Mic, texte: "2 conférences gratuites sur la santé cardiovasculaire" },
  { icone: Mail, texte: "1 newsletter mensuelle (actus médicales vérifiées)" },
  { icone: LifeBuoy, texte: "2 sessions de formation aux gestes de premiers secours" },
  { icone: MessagesSquare, texte: "Accès à une communauté WhatsApp pour échanger" },
];

// Sur grand écran, la formule la plus souscrite est au centre ; les autres gardent l'ordre des prix.
// Sur mobile, les cartes restent empilées par prix croissant.
const autres = ADHESIONS.filter((adhesion) => !("populaire" in adhesion && adhesion.populaire));
const PLACES = ADHESIONS.map((adhesion) =>
  "populaire" in adhesion && adhesion.populaire ? "lg:order-2" : adhesion === autres[0] ? "lg:order-1" : "lg:order-3",
);

const Tarifs = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div data-anime className="min-h-screen bg-background">
      {/* En-tête et adhésions */}
      <section className="pt-16 md:pt-20 pb-20 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-texte">Programme Sport & Santé</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-semibold text-primary">Tarifs & Adhésions</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Le Club Prévention est inclus dans toutes les adhésions. Vous hésitez ? Le premier mois est gratuit.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <Button asChild variant="cta" size="lg">
                <a href={LIEN_ESSAI}>
                  Essayer gratuitement pendant 1 mois
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Découvrez tous nos cours et le Club Prévention sans engagement.
            </p>
          </div>

          <div className="mt-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary">Adhérer au programme Sport & Santé</h2>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium transition-colors ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
                Annuel
              </span>
              <Switch
                checked={!isAnnual}
                onCheckedChange={(checked) => setIsAnnual(!checked)}
                aria-label="Afficher les tarifs mensuels"
                className="data-[state=checked]:bg-accent data-[state=unchecked]:bg-accent"
              />
              <span className={`text-sm font-medium transition-colors ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
                Mensuel
              </span>
            </div>
          </div>

          <div className="cartes-tarifs mt-10 grid lg:grid-cols-3 gap-6 lg:gap-7 lg:items-stretch">
            {ADHESIONS.map((adhesion, rang) => (
              <CarteAdhesion key={adhesion.nom} adhesion={adhesion} annuel={isAnnual} rang={rang} place={PLACES[rang]} />
            ))}
          </div>
        </div>
      </section>

      {/* La Carte Cœur */}
      <CarteCoeurSection />

      {/* Parrainage */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <Parrainage />
        </div>
      </section>

      {/* Club Prévention seul */}
      <section className="py-20 md:py-24 bg-muted/60">
        <div className="container mx-auto px-4">
          <Titre surtitre="Sans adhésion Sport & Santé" titre="Rejoindre le Club Prévention" />

          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-8">
            <div className="carte-vivante relative flex flex-col overflow-hidden rounded-3xl p-8 text-white md:p-10" style={{ backgroundColor: "hsl(196 93% 27%)" }}>
              <span aria-hidden="true" className="absolute -right-14 -top-16 h-44 w-44 rounded-full bg-jaune/90" />
              <span aria-hidden="true" className="absolute -bottom-20 -left-12 h-44 w-44 rounded-full bg-secondary/80" />
              <p className="relative text-sm font-medium text-white/80">Club Prévention</p>
              <p className="relative mt-4 flex items-baseline gap-2">
                <span className="text-7xl font-semibold tracking-tight tabular-nums">99 €</span>
                <span className="text-white/80">/ an</span>
              </p>
              <p className="relative mt-3 flex-1 text-lg text-white/90">
                Informez-vous et formez-vous toute l'année, sans adhésion aux cours de sport.
              </p>
              <Button asChild variant="gold" size="lg" className="relative mt-8 w-full sm:w-auto sm:self-start">
                <Link to="/inscription-club-prevention">
                  Je rejoins le Club
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>

            <ul className="cascade grid gap-3 sm:grid-cols-2">
              {clubPrevention.map(({ icone: Icone, texte }, index) => (
                <li
                  key={texte}
                  className={`carte-vivante flex items-start gap-4 rounded-2xl border border-border bg-card p-5 ${
                    index === clubPrevention.length - 1 ? "sm:col-span-2" : ""
                  }`}
                >
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-[hsl(196_93%_27%)]">
                    <Icone aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="pt-2 font-medium text-primary">{texte}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 text-center text-muted-foreground">
            Pas encore convaincu ? Testez tous les services de l'association pendant 1 mois : programme sport & santé en
            illimité et Club Prévention inclus.{" "}
            <Link to="/essai-gratuit" className="font-semibold text-accent-texte underline underline-offset-4 hover:no-underline">
              Tester 1 mois
            </Link>
          </p>
        </div>
      </section>

      {/* Formations et don */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            <article className="carte-vivante group flex flex-col overflow-hidden rounded-3xl border border-border bg-card">
              <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                <Photo
                  nom="secours"
                  width={800}
                  height={450}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <span className="absolute left-5 top-5 rounded-md bg-secondary px-3 py-1 text-sm font-semibold text-primary">
                  Initiations de 2 heures
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7 md:p-8">
                <h2 className="text-2xl font-semibold text-primary">Formations aux gestes qui sauvent</h2>
                <p className="mt-3 flex-1 text-muted-foreground">
                  Formations sur devis pour le grand public, associations, entreprises et établissements scolaires
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="cta" size="lg">
                    <Link to="/contact">
                      Demander un devis
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/formations">Voir les formations</Link>
                  </Button>
                </div>
              </div>
            </article>

            <article className="carte-vivante relative flex flex-col overflow-hidden rounded-3xl p-8 text-white md:p-10" style={{ backgroundColor: "hsl(354 51% 59%)" }}>
              <span aria-hidden="true" className="absolute -right-16 -bottom-20 h-56 w-56 rounded-full bg-[hsl(20_100%_65%)]" />
              <span aria-hidden="true" className="absolute -left-14 -top-16 h-40 w-40 rounded-full bg-jaune/90" />
              <Heart aria-hidden="true" className="coeur-bat relative h-16 w-16 fill-white text-white" />
              <h2 className="relative mt-8 text-3xl font-semibold">Don libre</h2>
              <p className="relative mt-3 flex-1 text-lg text-white/95">Soutenez l'association dans ses actions, sans adhésion</p>
              <Button asChild variant="clair" size="lg" className="relative mt-8 w-full sm:w-auto sm:self-start">
                <a
                  href="https://www.helloasso.com/associations/association-luciani/paiements/site-association-luciani-don-libre"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faire un don
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tarifs;
