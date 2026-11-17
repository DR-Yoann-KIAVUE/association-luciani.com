import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import formationCprTraining from "@/assets/formation-cpr-training.jpg";
import webinaireOnline from "@/assets/webinaire-online.jpg";
import elderlyManMobile from "@/assets/elderly-man-mobile.jpg";
import PageHero from "@/components/PageHero";
import photoHero from "@/assets/illustration-conference.jpg";

const images = [
  {
    src: formationCprTraining,
    alt: "Formation aux gestes de premiers secours - Massage cardiaque",
    titre: "Formation massage cardiaque",
    texte: "Apprenez les gestes qui sauvent avec nos formateurs diplômés",
  },
  {
    src: webinaireOnline,
    alt: "Webinaire sur la santé cardiovasculaire",
    titre: "Webinaires santé cardio",
    texte: "Conférences en ligne animées par des experts en santé cardiovasculaire",
  },
  {
    src: photoHero,
    alt: "Conférence de prévention cardiovasculaire",
    titre: "Conférences prévention",
    texte: "Interventions thématiques pour comprendre et prévenir les risques",
  },
  {
    src: elderlyManMobile,
    alt: "Accès mobile aux contenus du Club Prévention",
    titre: "Accès partout, tout le temps",
    texte: "Consultez vos contenus et restez connecté à la communauté depuis votre mobile",
  },
];

const newsletter = [
  "Actualités scientifiques vulgarisées",
  "Conseils nutrition et exercice",
  "Calendrier des événements à venir",
  "Témoignages et retours d'expérience",
];

const PackPrevention = () => {
  const packItems = [
    "4 webinaires thématiques par an",
    "2 conférences gratuites sur la santé cardiovasculaire",
    "1 newsletter mensuelle (actus médicales vérifiées)",
    "2 sessions de formation aux gestes de premiers secours",
    "Accès à une communauté WhatsApp pour échanger",
  ];

  const benefices = [
    {
      titre: "Prévention cardiovasculaire",
      description:
        "Accédez à des contenus expertisés par des professionnels de santé pour mieux comprendre et prévenir les risques cardiovasculaires.",
    },
    {
      titre: "Événements réguliers",
      description:
        "Participez à des webinaires thématiques et conférences tout au long de l'année sur des sujets de santé actuels et essentiels.",
    },
    {
      titre: "Formation premiers secours",
      description:
        "Apprenez les gestes qui sauvent lors de sessions pratiques encadrées par nos formateurs diplômés.",
    },
    {
      titre: "Communauté engagée",
      description:
        "Rejoignez une communauté bienveillante sur WhatsApp pour échanger, poser vos questions et partager vos expériences.",
    },
  ];

  const webinaires = [
    {
      titre: "Comprendre l'hypertension",
      description: "Les facteurs de risque, le diagnostic et les solutions pour mieux vivre au quotidien",
    },
    {
      titre: "Nutrition et santé cardiaque",
      description: "Les aliments à privilégier et ceux à éviter pour un cœur en bonne santé",
    },
    {
      titre: "Activité physique adaptée",
      description: "Comment bouger sainement selon son profil et ses capacités",
    },
    {
      titre: "Stress et santé cardiovasculaire",
      description: "Comprendre l'impact du stress et apprendre à le gérer efficacement",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        ton="marine"
      image={{ src: photoHero, alt: "Conférence de prévention cardiovasculaire" }}
        surtitre="Vivre plus longtemps et en meilleure santé"
        titre="Club Prévention"
        texte="Rejoignez votre Club Prévention. Informez-vous, formez-vous pour votre santé."
      >
        <Button asChild variant="clair" size="lg">
          <Link to="/inscription-club-prevention">
            Je rejoins le Club · 99 € / an
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild variant="contour" size="lg">
          <Link to="/essai-gratuit">Essayer 1 mois gratuitement</Link>
        </Button>
      </PageHero>

      {/* Ce qui est inclus */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-texte">L'adhésion</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-primary">Ce qui est inclus</h2>
              <p className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-semibold tracking-tight tabular-nums text-primary">99 €</span>
                <span className="text-muted-foreground">/ an</span>
              </p>
              <p className="mt-2 text-muted-foreground">Accès à tous les contenus et événements</p>
              <p className="mt-6 border-l-2 border-accent pl-4 text-sm text-muted-foreground">
                Le Club Prévention est inclus dans les adhésions aux séances de sport.{" "}
                <Link to="/tarifs" className="font-semibold text-accent-texte underline underline-offset-4 hover:no-underline">
                  Voir toutes les adhésions
                </Link>
              </p>
            </div>
            <ul className="rounded-xl border border-border divide-y divide-border">
              {packItems.map((item) => (
                <li key={item} className="flex items-start gap-3 p-5">
                  <Check aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-texte" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Bénéfices */}
      <section className="py-20 md:py-24 bg-muted/60">
        <div className="container mx-auto px-4">
          <h2 className="max-w-2xl text-3xl md:text-4xl font-semibold text-primary">
            Pourquoi souscrire au Club Prévention ?
          </h2>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefices.map((item, index) => (
              <article key={item.titre} className="rounded-xl border border-border bg-card p-6">
                <p className="text-sm font-semibold tabular-nums text-accent-texte">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-lg font-semibold text-primary">{item.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 grid md:grid-cols-[1fr_auto] gap-6 items-center rounded-xl border border-border bg-card p-6 md:p-8">
            <div>
              <h3 className="text-xl font-semibold text-primary">Vous voulez aller plus loin ?</h3>
              <p className="mt-2 text-muted-foreground">
                Complétez votre adhésion avec nos cours de sport encadrés ! C'est moins cher en combinant les deux
                formules, et c'est l'occasion de prendre en main votre santé en pratiquant une activité physique
                régulière adaptée à vos besoins.
              </p>
            </div>
            <Button asChild variant="outline" size="lg">
              <Link to="/sport-sante">Découvrir nos cours de sport</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* En images */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-primary">Club Prévention en images</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Découvrez l'ambiance de nos sessions de formation et webinaires
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            {images.map((image) => (
              <figure key={image.titre} className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="p-6">
                  <h3 className="text-lg font-semibold text-primary">{image.titre}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{image.texte}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Webinaires et newsletter */}
      <section className="py-20 md:py-24 bg-muted/60">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-primary">Exemples de webinaires thématiques</h2>
              <p className="mt-3 text-muted-foreground">
                4 webinaires par an animés par des experts en santé cardiovasculaire
              </p>
              <dl className="mt-8 divide-y divide-border border-y border-border">
                {webinaires.map((item) => (
                  <div key={item.titre} className="py-5">
                    <dt className="font-semibold text-primary">{item.titre}</dt>
                    <dd className="mt-1 text-sm text-muted-foreground">{item.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-primary">Newsletter mensuelle</h2>
              <p className="mt-3 text-muted-foreground">
                Chaque mois, recevez des actualités médicales vérifiées, des conseils pratiques et des informations sur
                nos prochains événements.
              </p>
              <ul className="mt-8 divide-y divide-border border-y border-border">
                {newsletter.map((item) => (
                  <li key={item} className="flex items-center gap-3 py-5">
                    <Check aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-accent-texte" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Appel à l'action */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold">Prêt à prendre soin de votre santé ?</h2>
              <p className="mt-3 text-lg text-white/80">
                Rejoignez notre communauté et bénéficiez d'un accompagnement complet pour 99€ par an
              </p>
            </div>
            <Button asChild variant="gold" size="lg" className="flex-shrink-0">
              <Link to="/inscription-club-prevention">
                Je rejoins le Club
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackPrevention;
