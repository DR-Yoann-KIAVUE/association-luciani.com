import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import CarteCoeurSection from "@/components/CarteCoeurSection";

const INSCRIPTION = "https://app.association-luciani.com/register?planId=";
const LIEN_ESSAI = `${INSCRIPTION}ae932234-ac5e-4ee9-b190-5864b063fb05`;

const adhesions = [
  {
    nom: "Découverte",
    accroche: "Pour débuter en douceur",
    rythme: "1 cours / semaine",
    repere: "à moins de 3 euros par cours",
    annuel: { prix: "149", plan: "56aa4743-8ce2-4f8a-88d0-51528d36e7d2" },
    mensuel: { prix: "15", plan: "1f87af7e-7787-4b17-ba4b-f6e785542776" },
  },
  {
    nom: "Standard",
    accroche: "Pour découvrir nos activités",
    rythme: "2 cours / semaine",
    repere: "à moins de 2 euros par cours",
    annuel: { prix: "199", plan: "d67d313a-2000-4ed1-8cae-20fa56eaca7f" },
    mensuel: { prix: "19", plan: "5c7f7657-96fc-4aef-86e5-5ceb4e022d3b" },
    populaire: true,
  },
  {
    nom: "Illimitée",
    accroche: "Pour les plus motivés",
    rythme: "Cours illimités",
    repere: "à moins de 1 euro par cours",
    annuel: { prix: "219", plan: "699b4c98-1dff-4459-a888-20fc277c14c7" },
    mensuel: { prix: "22", plan: "9a1e070c-7129-48b5-b63b-cbca731e197c" },
  },
];

const parrainage = [
  { filleuls: "1 filleul", condition: "Parrainez 1 ami qui devient adhérent payant", recompense: "Carte cadeau de 30 € chez Décathlon" },
  { filleuls: "2 filleuls", condition: "Parrainez 2 amis qui deviennent adhérents payants", recompense: "Carte cadeau de 60 € chez Décathlon" },
  { filleuls: "3 filleuls", condition: "Parrainez 3 amis qui deviennent adhérents payants", recompense: "Adhésion remboursée" },
];

const clubPrevention = [
  "4 webinaires thématiques par an",
  "2 conférences gratuites sur la santé cardiovasculaire",
  "1 newsletter mensuelle (actus médicales vérifiées)",
  "2 sessions de formation aux gestes de premiers secours",
  "Accès à une communauté WhatsApp pour échanger",
];

const Tarifs = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* En-tête et adhésions */}
      <section className="pt-16 md:pt-20 pb-20 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Programme Sport & Santé</p>
            <h1 className="mt-3 text-4xl md:text-5xl font-semibold text-primary">Tarifs & Adhésions</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Le Club Prévention est inclus dans toutes les adhésions. Vous hésitez ? Le premier mois est gratuit.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
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

          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            {adhesions.map((adhesion) => {
              const offre = isAnnual ? adhesion.annuel : adhesion.mensuel;
              return (
                <article
                  key={adhesion.nom}
                  className={`relative flex flex-col rounded-xl bg-card p-7 md:p-8 ${
                    adhesion.populaire
                      ? "border-2 border-accent shadow-[var(--card-shadow-hover)]"
                      : "border border-border shadow-[var(--card-shadow)]"
                  }`}
                >
                  {adhesion.populaire && (
                    <p className="absolute -top-3 left-7 bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground rounded">
                      Populaire
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">Adhésion</p>
                  <h3 className="mt-1 text-2xl font-semibold text-primary">{adhesion.nom}</h3>
                  <p className="mt-1 text-muted-foreground">{adhesion.accroche}</p>

                  <p className="mt-7 flex items-baseline gap-2">
                    <span className="text-5xl font-semibold tracking-tight tabular-nums text-primary">{offre.prix} €</span>
                    <span className="text-muted-foreground">/ {isAnnual ? "an" : "mois"}</span>
                  </p>

                  <ul className="mt-7 space-y-3 border-t border-border pt-6 flex-1">
                    <li className="flex items-start gap-3">
                      <Check aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                      <span>
                        <span className="font-semibold">{adhesion.rythme}</span>
                        <span className="block text-sm text-muted-foreground">{adhesion.repere}</span>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                      <span className="font-semibold">Club Prévention inclus</span>
                    </li>
                  </ul>

                  <Button asChild variant={adhesion.populaire ? "cta" : "outline"} size="lg" className="mt-8 w-full">
                    <a href={`${INSCRIPTION}${offre.plan}`} aria-label={`S'inscrire à l'adhésion ${adhesion.nom}`}>
                      S'inscrire
                    </a>
                  </Button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* La Carte Cœur */}
      <CarteCoeurSection />

      {/* Parrainage */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Parrainage</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-primary">Programme de parrainage</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Parrainez vos proches et bénéficiez de récompenses exceptionnelles.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Valable 3 mois après votre inscription, hors offre 1 mois offert. Pour en bénéficier, contactez-nous
                avec les coordonnées de vos filleuls.
              </p>
              <Button asChild variant="outline" className="mt-6">
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
            <ol className="rounded-xl border border-border divide-y divide-border">
              {parrainage.map((palier) => (
                <li key={palier.filleuls} className="grid sm:grid-cols-[8rem_1fr] gap-x-6 gap-y-1 p-6">
                  <p className="text-xl font-semibold text-accent">{palier.filleuls}</p>
                  <div>
                    <p className="font-semibold text-primary">{palier.recompense}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{palier.condition}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Club Prévention seul */}
      <section className="py-20 md:py-24 bg-muted/60">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Sans adhésion Sport & Santé</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-primary">Rejoindre le Club Prévention</h2>
              <p className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-semibold tracking-tight tabular-nums text-primary">99 €</span>
                <span className="text-muted-foreground">/ an</span>
              </p>
              <Button asChild variant="cta" size="lg" className="mt-8 w-full sm:w-auto">
                <Link to="/inscription-club-prevention">
                  Je rejoins le Club
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <p className="mt-6 text-sm text-muted-foreground">
                Pas encore convaincu ? Testez tous les services de l'association pendant 1 mois : programme sport & santé
                en illimité et Club Prévention inclus.{" "}
                <Link to="/essai-gratuit" className="font-semibold text-accent underline underline-offset-4 hover:no-underline">
                  Tester 1 mois
                </Link>
              </p>
            </div>
            <ul className="rounded-xl border border-border bg-card divide-y divide-border">
              {clubPrevention.map((item) => (
                <li key={item} className="flex items-start gap-3 p-5">
                  <Check aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Formations et don */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col rounded-xl border border-border p-8">
              <h2 className="text-2xl font-semibold text-primary">Formations aux gestes qui sauvent</h2>
              <p className="mt-3 flex-1 text-muted-foreground">
                Formations sur devis pour le grand public, associations, entreprises et établissements scolaires
              </p>
              <Button asChild variant="outline" size="lg" className="mt-6 self-start">
                <Link to="/contact">Demander un devis</Link>
              </Button>
            </div>
            <div className="flex flex-col rounded-xl border border-border p-8">
              <h2 className="text-2xl font-semibold text-primary">Don libre</h2>
              <p className="mt-3 flex-1 text-muted-foreground">Soutenez l'association dans ses actions, sans adhésion</p>
              <Button asChild variant="outline" size="lg" className="mt-6 self-start">
                <a
                  href="https://www.helloasso.com/associations/association-luciani/paiements/site-association-luciani-don-libre"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Faire un don
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tarifs;
