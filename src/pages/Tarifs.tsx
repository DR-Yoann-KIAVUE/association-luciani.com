import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import CarteCoeurSection from "@/components/CarteCoeurSection";
import CarteAdhesion from "@/components/CarteAdhesion";
import { ADHESIONS, LIEN_ESSAI } from "@/config/adhesions";


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
              <CarteAdhesion key={adhesion.nom} adhesion={adhesion} annuel={isAnnual} rang={rang} />
            ))}
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
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-texte">Parrainage</p>
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
                  <p className="text-xl font-semibold text-accent-texte">{palier.filleuls}</p>
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
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-texte">Sans adhésion Sport & Santé</p>
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
                <Link to="/essai-gratuit" className="font-semibold text-accent-texte underline underline-offset-4 hover:no-underline">
                  Tester 1 mois
                </Link>
              </p>
            </div>
            <ul className="rounded-xl border border-border bg-card divide-y divide-border">
              {clubPrevention.map((item) => (
                <li key={item} className="flex items-start gap-3 p-5">
                  <Check aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-texte" />
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
