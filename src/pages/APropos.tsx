import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import presidentYoann from "@/assets/president-yoann.png";
import PageHero from "@/components/PageHero";
import Titre from "@/components/Titre";

const APropos = () => {
  const valeurs = [
    {
      titre: "Bienveillance",
      description:
        "Un accompagnement humain, respectueux du rythme de chacun, dans un cadre sécurisant et motivant.",
    },
    {
      titre: "Engagement",
      description:
        "Une présence active sur le terrain, au service de la prévention cardiovasculaire et de la formation aux premiers secours.",
    },
    {
      titre: "Pédagogie",
      description:
        "Transmettre des savoirs et des gestes essentiels avec clarté, simplicité et professionnalisme.",
    },
    {
      titre: "Accessibilité",
      description:
        "Rendre la santé cardiovasculaire accessible à tous, quel que soit l'âge, le niveau ou les moyens.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        ton="marine"
        surtitre="Qui sommes-nous"
        titre="L'Association"
        texte="Une association locale engagée pour la prévention cardiovasculaire à Saint-Raphaël"
      />

      {/* Le mot du président */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-texte">Le fondateur</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-primary">Le mot du président</h2>
              <div className="mt-8 flex items-center gap-4">
                <img
                  src={presidentYoann}
                  alt="Dr KIAVUE Yoann, Cardiologue et Fondateur"
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-primary">Dr KIAVUE Yoann</h3>
                  <p className="text-sm font-medium text-accent-texte">Cardiologue - Fondateur de l'Association LUCIANI</p>
                </div>
              </div>
            </div>
            <div>
              <blockquote className="text-xl md:text-2xl font-light leading-relaxed text-primary">
                « Nous voulons aller plus loin que les consultations. Notre engagement : agir concrètement pour réduire
                la mortalité cardiovasculaire. Prévenir, former, sensibiliser, accompagner — parce que chaque battement
                compte, et que la santé du cœur doit être une cause partagée par tous. »
              </blockquote>
              <p className="mt-8 border-l-2 border-accent pl-4 leading-relaxed text-muted-foreground">
                Cardiologue spécialisé en prévention cardiovasculaire, il est aussi le fondateur de la{" "}
                <a
                  href="https://www.clinique-cardiovasculaire-raphaeloise.fr/"
                  className="font-medium text-primary underline underline-offset-4 hover:no-underline"
                >
                  Clinique Cardiovasculaire Raphaëloise
                </a>
                , à Saint-Raphaël.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="py-20 md:py-24 bg-muted/60">
        <div className="container mx-auto px-4">
          <Titre surtitre="Ce qui nous guide" titre="Nos valeurs" />

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valeurs.map((valeur, index) => (
              <article key={valeur.titre} className="rounded-xl border border-border bg-card p-6">
                <p className="text-sm font-semibold tabular-nums text-accent-texte">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-xl font-semibold text-primary">{valeur.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{valeur.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Nous rejoindre */}
      <section className="bg-jaune text-jaune-foreground">
        <div className="container mx-auto px-4 py-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">Envie de nous rejoindre ?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg">
            Découvrez nos cours pendant un mois, gratuitement et sans engagement.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/essai-gratuit">
                Mois d'essai gratuit
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary/40 bg-transparent hover:bg-white/40">
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default APropos;
