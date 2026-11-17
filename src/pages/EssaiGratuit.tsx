import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import Planning from "@/components/Planning";
import TrouverMonCours from "@/components/TrouverMonCours";

const TRIAL_REGISTRATION_URL = "https://app.association-luciani.com/register?planId=ae932234-ac5e-4ee9-b190-5864b063fb05";

const benefits = [
  "Accès illimité à tous les cours pendant 1 mois",
  "Découverte du programme Sport & Santé et du Club Prévention",
  "Sans engagement",
];

const etapes = [
  { titre: "Inscrivez-vous en ligne", texte: "Créez votre compte depuis le formulaire officiel d'inscription au mois d'essai gratuit." },
  { titre: "Réservez vos séances", texte: "Choisissez vos cours dans votre espace membre ou dans l'application, 24h/24." },
  { titre: "Venez bouger", texte: "Les coachs adaptent chaque séance à votre niveau, y compris si vous débutez." },
];

const EssaiGratuit = () => (
  <main className="min-h-screen bg-background">
    <PageHero
      ton="bordeaux"
      surtitre="Mois d'essai gratuit"
      titre="Testez le programme pendant 1 mois"
      texte="Profitez de votre mois d’essai gratuit en quelques clics."
    >
      <Button asChild variant="clair" size="lg">
        <a href={TRIAL_REGISTRATION_URL}>
          Démarrer mon essai gratuit
          <ArrowRight aria-hidden="true" />
        </a>
      </Button>
    </PageHero>

    <section className="py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Ce qui est inclus</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-primary">Un mois complet pour vous faire une idée</h2>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 py-4">
                  <Check aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-accent" />
                  <span className="font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Comment ça marche</p>
            <ol className="mt-6 space-y-6">
              {etapes.map((etape, index) => (
                <li key={etape.titre} className="grid grid-cols-[2.5rem_1fr] gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent text-sm font-semibold tabular-nums text-accent">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">{etape.titre}</h3>
                    <p className="mt-1 text-muted-foreground">{etape.texte}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section className="pb-20 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Par où commencer</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-primary">Trouvez le cours fait pour vous</h2>
        </div>
        <div className="mt-10">
          <TrouverMonCours inscriptionDirecte />
        </div>
      </div>
    </section>

    <section className="py-20 md:py-24 bg-muted/60">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Les cours à essayer</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-primary">Le planning de la semaine</h2>
        </div>
        <div className="mt-10">
          <Planning />
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button asChild variant="cta" size="lg">
            <a href={TRIAL_REGISTRATION_URL}>
              Démarrer mon essai gratuit
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/tarifs">Voir les tarifs après l'essai</Link>
          </Button>
        </div>
      </div>
    </section>
  </main>
);

export default EssaiGratuit;
