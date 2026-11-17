import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Clock, Users } from "lucide-react";
import formationMassage1 from "@/assets/formation-massage-cardiaque-1.jpg";
import atelierScolaire from "@/assets/atelier-scolaire.jpg";
import PageHero from "@/components/PageHero";
import photoHero from "@/assets/illustration-secours.jpg";

const Formations = () => {
  const formations = [
    {
      titre: "Grand Public et Groupes",
      duree: "2h",
      public: "Adulte (Associations ou Entreprises)",
      description:
        "Formation initiation aux gestes de premiers secours. Apprenez à alerter les secours, pratiquer un massage cardiaque efficace et utiliser un défibrillateur (DAE) en toute sécurité.",
      image: "formation-massage-cardiaque-1.jpg",
      programme: [
        "Brief sécurité & chaîne de survie (15 min)",
        "Reconnaître un arrêt cardiaque (20 min)",
        "Massage externe + DAE pratique (60 min)",
        "Cas concrets et questions/réponses (25 min)"
      ]
    },
    {
      titre: "Atelier scolaire",
      duree: "2h",
      public: "CM1/CM2/Collège/Lycée",
      description:
        "Sensibilisation adaptée aux jeunes pour apprendre les réflexes essentiels dès le plus jeune âge. Format ludique et pédagogique.",
      image: "formation-massage-cardiaque-2.jpg",
      programme: [
        "Présentation ludique de la chaîne de survie (10 min)",
        "Reconnaître une urgence - jeux de rôle (20 min)",
        "Pratique massage cardiaque adaptée à l'âge (70 min)",
        "Débriefing et remise d'un diplôme (20 min)"
      ]
    },
  ];

  const methode = [
    "Démonstrations pratiques par nos formateurs",
    "Mises en situation réalistes",
    "Pratique sur mannequins professionnels",
    "Évaluation formative individualisée",
  ];

  return (
    <div className="min-h-screen">
      <PageHero
        ton="rouge"
      image={{ src: photoHero, alt: "Initiation au massage cardiaque sur mannequin" }}
        surtitre="Alerter · Masser · Défibriller"
        titre="Nos formations"
        texte={
          <>
            Des sessions accessibles à tous, animées par des formateurs diplômés. Objectif : savoir alerter, pratiquer
            un massage cardiaque et utiliser un DAE en toute sécurité.
          </>
        }
      >
        <Button asChild variant="clair" size="lg">
          <Link to="/contact">
            Demander un devis
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild variant="contour" size="lg">
          <a href="#formats">Voir les formations</a>
        </Button>
      </PageHero>

      {/* Formations */}
      <section id="formats" className="scroll-mt-24 py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-texte">Initiations de 2 heures</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-primary">Adaptées à chaque public et besoin</h2>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-6 lg:gap-8">
            {formations.map((formation, index) => {
              const formationImage = index === 0 ? formationMassage1 : atelierScolaire;
              return (
                <article
                  key={formation.titre}
                  className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--card-shadow)]"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-muted">
                    <img
                      src={formationImage}
                      alt={formation.titre}
                      width={800}
                      height={450}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <h3 className="text-2xl font-semibold text-primary">{formation.titre}</h3>
                    <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock aria-hidden="true" className="h-4 w-4" />
                        {formation.duree}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Users aria-hidden="true" className="h-4 w-4" />
                        {formation.public}
                      </span>
                    </p>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{formation.description}</p>

                    <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-primary">Exemple de déroulé</h4>
                    <ol className="mt-3 flex-1 space-y-2">
                      {formation.programme.map((etape) => (
                        <li key={etape} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <Check aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-texte" />
                          <span>{etape}</span>
                        </li>
                      ))}
                    </ol>

                    <Button asChild variant="cta" size="lg" className="mt-8 w-full sm:w-auto sm:self-start">
                      <Link to="/contact">Programmer une session</Link>
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Méthode */}
      <section className="py-20 md:py-24 bg-muted/60">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-texte">Pédagogie</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-primary">Notre méthode</h2>
              <ul className="mt-8 divide-y divide-border border-y border-border">
                {methode.map((item) => (
                  <li key={item} className="flex items-center gap-3 py-4">
                    <Check aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-accent-texte" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="self-end rounded-xl border border-border bg-card p-6 md:p-8">
              <h3 className="text-xl font-semibold text-primary">Attestation et conformité</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Tous nos intervenants sont diplômés et régulièrement formés aux dernières normes. Le matériel utilisé
                est conforme aux standards en vigueur et un protocole d'hygiène strict est appliqué pour chaque session.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Appel à l'action */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold">Prêt à apprendre les gestes qui sauvent ?</h2>
              <p className="mt-3 text-lg text-white/80">Demandez un devis ou programmez une session dès maintenant</p>
            </div>
            <Button asChild variant="gold" size="lg" className="flex-shrink-0">
              <Link to="/contact">
                Demander un devis
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Formations;
