import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { StoreBadges } from "@/components/AppSection";
import PageHero from "@/components/PageHero";
import photoHero from "@/assets/illustration-sport.jpg";
import Planning from "@/components/Planning";
import { COACHS } from "@/config/planning";

const questions = [
  {
    question: "Quel niveau requis ?",
    reponse:
      "Tous nos cours sont adaptés aux débutants. Les coachs donnent des consignes adaptées à chaque niveau et proposent des variations pour que chacun progresse à son rythme.",
  },
  {
    question: "Quel matériel apporter ?",
    reponse:
      "Une tenue confortable et une bouteille d'eau sont essentiels. Pour les cours de Pilates et Yoga, il est préférable de venir avec une serviette et son tapis. Tout autre équipement est fourni sur place.",
  },
  {
    question: "Que se passe-t-il en cas de mauvais temps ?",
    reponse:
      "La plupart des séances se font en intérieur. Pour celles en extérieur, le coach décidera d'une éventuelle annulation au maximum 24h à l'avance par message.",
  },
  {
    question: "Comment s'inscrire ?",
    reponse:
      "Choisissez votre adhésion sur la page Tarifs et inscrivez-vous en ligne. Vous pouvez aussi commencer par un mois d'essai gratuit, sans engagement.",
  },
];

const espaceMembre = [
  { titre: "Réserver vos séances", texte: "en toute autonomie, 24h/24" },
  { titre: "Annuler une réservation", texte: "jusqu'à 24h avant la séance" },
  { titre: "Gérer votre adhésion", texte: "et suivre vos crédits de séances" },
  { titre: "Consulter les horaires", texte: "et lieux de chaque séance" },
];

const FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: questions.map(({ question, reponse }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: reponse },
  })),
};

const SportSante = () => (
  <div className="min-h-screen">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ) }} />

    <PageHero
      ton="bordeaux"
      image={{ src: photoHero, alt: "Cours collectif de sport santé encadré par un coach" }}
      surtitre="Sport & Santé · Saint-Raphaël"
      titre="Le sport, un allié essentiel pour un cœur en pleine forme"
      texte="Des séances collectives encadrées par des coachs diplômés, adaptées à tous les niveaux, pour améliorer votre endurance, votre force et votre bien-être cardio."
    >
      <Button asChild variant="clair" size="lg">
        <Link to="/essai-gratuit">
          Essayer gratuitement pendant 1 mois
          <ArrowRight aria-hidden="true" />
        </Link>
      </Button>
      <Button asChild variant="contour" size="lg">
        <a href="#planning">Voir le planning</a>
      </Button>
    </PageHero>

    {/* Planning */}
    <section id="planning" className="scroll-mt-24 py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Du lundi au vendredi</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-primary">Planning des séances de sport</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Toutes les séances sont encadrées par nos coach·es sportifs diplômés et kinésithérapeutes, pour vous garantir
            un accompagnement sécurisé et adapté à vos besoins.
          </p>
        </div>

        <div className="mt-10">
          <Planning detail />
        </div>

        <div className="mt-10 grid md:grid-cols-[1fr_auto] gap-6 items-center rounded-xl border border-border p-6 md:p-8">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-primary">
              Envie d'essayer nos cours pendant 1 mois gratuitement ?
            </h3>
            <p className="mt-1 text-muted-foreground">Et profiter du Club Prévention</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="cta" size="lg">
              <Link to="/essai-gratuit">Tester 1 mois gratuitement</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/tarifs">Voir tous les tarifs & adhésions</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Coachs */}
    <section className="py-20 md:py-24 bg-muted/60">
      <div className="container mx-auto px-4">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">L'équipe</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-primary">Nos coachs diplômés</h2>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(COACHS).map(([nom, coach]) => (
            <article key={nom} className="rounded-xl border border-border bg-card p-6">
              <img
                src={coach.photo}
                alt={`${nom} - ${coach.role}`}
                width={80}
                height={80}
                loading="lazy"
                decoding="async"
                className="h-20 w-20 rounded-full object-cover"
              />
              <h3 className="mt-5 text-xl font-semibold text-primary">{nom}</h3>
              <p className="text-sm font-medium text-accent">{coach.specialite}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{coach.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* Questions fréquentes */}
    <section className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Avant de commencer</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-primary">Questions fréquentes</h2>
          </div>
          <dl className="divide-y divide-border border-y border-border">
            {questions.map(({ question, reponse }) => (
              <div key={question} className="py-6">
                <dt className="text-lg font-semibold text-primary">{question}</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">{reponse}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>

    {/* Appel à l'action */}
    <section className="text-white" style={{ background: "linear-gradient(150deg, #A12E3C, #6E172C)" }}>
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold">Envie de tester ? On vous offre 1 mois en illimité</h2>
            <p className="mt-3 text-lg text-white/80">Avec le Club Prévention inclus.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Button asChild variant="clair" size="lg">
              <Link to="/essai-gratuit">J'essaie 1 mois gratuitement</Link>
            </Button>
            <Button asChild variant="contour" size="lg">
              <a href="https://app.association-luciani.com/register">Je m&apos;inscris au cours de sport</a>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Espace membre */}
    <section className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Adhérents</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-primary">Votre espace membre</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Gérez vos réservations en toute autonomie avec notre application en ligne
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-2 gap-6">
          <div className="min-w-0 rounded-xl border border-border p-6 md:p-8">
            <h3 className="text-xl font-semibold text-primary">Qu'est-ce que l'espace membre ?</h3>
            <p className="mt-3 text-muted-foreground">
              L'espace membre est notre application en ligne qui vous permet de :
            </p>
            <ul className="mt-5 space-y-3">
              {espaceMembre.map(({ titre, texte }) => (
                <li key={titre} className="flex items-start gap-3">
                  <Check aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                  <span className="text-muted-foreground">
                    <strong className="font-semibold text-foreground">{titre}</strong> {texte}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 rounded-xl border border-border bg-muted/60 p-6 md:p-8">
            <h3 className="text-xl font-semibold text-primary">Connectez-vous à votre espace</h3>
            <p className="mt-3 text-muted-foreground">
              Accédez à votre compte pour réserver vos prochaines séances et gérer vos participations.
            </p>
            <Button asChild variant="default" size="lg" className="mt-6 w-full whitespace-normal h-auto min-h-12 py-3">
              <a href="https://app.association-luciani.com/login">Se connecter à mon espace membre</a>
            </Button>
            <p className="mt-3 text-sm text-muted-foreground">
              Vous recevrez vos identifiants par email après votre adhésion
            </p>
            <div className="mt-6 border-t border-border pt-6">
              <p className="mb-3 text-sm font-semibold text-primary">Ou sur votre téléphone, avec l'application</p>
              <StoreBadges appleHeight={40} />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default SportSante;
