import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Dumbbell,
  Flower2,
  Infinity as Infini,
  PersonStanding,
  RotateCcw,
  Shuffle,
  Sun,
  Sunrise,
  Sunset,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ADHESIONS, LIEN_ESSAI } from "@/config/adhesions";
import { COACHS, CRENEAUX, horaire, semaineType } from "@/config/planning";

/**
 * Simulateur en trois étapes : un cœur se remplit à chaque réponse, puis le
 * programme se révèle avec les cours du planning et l'adhésion conseillée.
 */

type Choix = { valeur: string; libelle: string; detail: string; icone?: LucideIcon; chiffre?: string; couleur: string };

const BLEU = "hsl(196 93% 27%)";
const ROUGE = "hsl(354 51% 59%)";
const TURQUOISE = "hsl(174 72% 41%)";
const JAUNE = "hsl(45 100% 53%)";
const ORANGE = "hsl(20 100% 65%)";

const QUESTIONS: { etape: string; titre: string; choix: Choix[] }[] = [
  {
    etape: "Objectif",
    titre: "Quel est votre objectif ?",
    choix: [
      { valeur: "souffle", libelle: "Retrouver du souffle", detail: "Endurance accessible et progressive", icone: Wind, couleur: BLEU },
      { valeur: "force", libelle: "Me renforcer", detail: "Renforcement global, à votre rythme", icone: Dumbbell, couleur: ROUGE },
      { valeur: "souplesse", libelle: "Gagner en souplesse", detail: "Souffle, souplesse et récupération", icone: Flower2, couleur: TURQUOISE },
      { valeur: "posture", libelle: "Soigner ma posture", detail: "Posture, mobilité, respiration", icone: PersonStanding, couleur: ORANGE },
    ],
  },
  {
    etape: "Horaires",
    titre: "Quand êtes-vous disponible ?",
    choix: [
      { valeur: "matin", libelle: "Le matin", detail: "Avant midi", icone: Sunrise, couleur: JAUNE },
      { valeur: "midi", libelle: "En journée", detail: "Entre midi et 17 h", icone: Sun, couleur: ORANGE },
      { valeur: "soir", libelle: "En fin de journée", detail: "À partir de 17 h", icone: Sunset, couleur: ROUGE },
      { valeur: "tous", libelle: "Peu importe", detail: "Je m'adapte", icone: Shuffle, couleur: TURQUOISE },
    ],
  },
  {
    etape: "Rythme",
    titre: "À quel rythme souhaitez-vous pratiquer ?",
    choix: [
      { valeur: "0", libelle: "1 cours par semaine", detail: "Pour débuter en douceur", chiffre: "1", couleur: TURQUOISE },
      { valeur: "1", libelle: "2 cours par semaine", detail: "Pour découvrir nos activités", chiffre: "2", couleur: BLEU },
      { valeur: "2", libelle: "Autant que possible", detail: "Pour les plus motivés", icone: Infini, couleur: ROUGE },
    ],
  },
];

const COURS_PAR_OBJECTIF: Record<string, string[]> = {
  souffle: ["Cardio", "Cardio Renfo"],
  force: ["Circuit training", "Cardio Renfo"],
  souplesse: ["Yoga", "Pilates"],
  posture: ["Pilates", "Yoga"],
};

const PROFILS: Record<string, { nom: string; phrase: string }> = {
  souffle: { nom: "Profil Souffle", phrase: "Vous voulez retrouver de l'endurance, pas à pas." },
  force: { nom: "Profil Tonique", phrase: "Vous voulez vous renforcer, à votre rythme." },
  souplesse: { nom: "Profil Sérénité", phrase: "Vous cherchez la souplesse et la récupération." },
  posture: { nom: "Profil Équilibre", phrase: "Vous voulez prendre soin de votre posture." },
};

const auBonMoment = (heure: string, moment: string) => {
  const debut = Number(heure.slice(0, 2));
  if (moment === "matin") return debut < 12;
  if (moment === "midi") return debut >= 12 && debut < 17;
  if (moment === "soir") return debut >= 17;
  return true;
};

/** Cœur qui se remplit selon la progression (0 à 1). */
const Coeur = ({ progression, bat }: { progression: number; bat: boolean }) => (
  <svg viewBox="0 0 100 92" aria-hidden="true" className={`h-28 w-28 ${bat ? "coeur-bat" : ""}`}>
    <defs>
      <clipPath id="forme-coeur">
        <path d="M50 88 C20 66 4 50 4 30 C4 14 16 4 29 4 C38 4 46 9 50 17 C54 9 62 4 71 4 C84 4 96 14 96 30 C96 50 80 66 50 88 Z" />
      </clipPath>
    </defs>
    <g clipPath="url(#forme-coeur)">
      <rect width="100" height="92" fill="rgba(255,255,255,0.14)" />
      <rect
        className="coeur-niveau"
        x="0"
        width="100"
        height="92"
        fill={JAUNE}
        style={{ transform: `translateY(${(1 - progression) * 92}px)` }}
      />
    </g>
    <path
      d="M50 88 C20 66 4 50 4 30 C4 14 16 4 29 4 C38 4 46 9 50 17 C54 9 62 4 71 4 C84 4 96 14 96 30 C96 50 80 66 50 88 Z"
      fill="none"
      stroke="rgba(255,255,255,0.55)"
      strokeWidth="2"
    />
  </svg>
);

/** `inscriptionDirecte` : le bouton final mène au formulaire d'inscription plutôt qu'à la page d'essai. */
const TrouverMonCours = ({ inscriptionDirecte = false }: { inscriptionDirecte?: boolean }) => {
  const [reponses, setReponses] = useState<string[]>([]);
  const [enCours, setEnCours] = useState<string | null>(null);
  const attente = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(attente.current), []);

  const etape = reponses.length;
  const termine = etape === QUESTIONS.length;
  const progression = (etape + (enCours ? 1 : 0)) / QUESTIONS.length;

  // La carte choisie se colore, puis l'étape suivante arrive.
  const repondre = (valeur: string) => {
    if (enCours) return;
    setEnCours(valeur);
    attente.current = setTimeout(() => {
      setReponses((precedentes) => [...precedentes, valeur]);
      setEnCours(null);
    }, 420);
  };
  const revenir = () => setReponses(reponses.slice(0, -1));
  const allerA = (index: number) => !enCours && index < etape && setReponses(reponses.slice(0, index));

  const [objectif, moment, rythme] = reponses;
  const seances = semaineType(CRENEAUX).flatMap(({ nom, creneaux }) =>
    creneaux.map((c) => ({
      jour: nom,
      titre: c.activity.name,
      couleur: c.activity.color,
      heure: c.startTime,
      plage: horaire(c),
      coach: c.coach?.firstName ?? "",
      lieu: c.location,
    })),
  );
  const pourObjectif = seances.filter((s) => COURS_PAR_OBJECTIF[objectif]?.includes(s.titre));
  const auxBonsHoraires = pourObjectif.filter((s) => auBonMoment(s.heure, moment));
  const propositions = (auxBonsHoraires.length > 0 ? auxBonsHoraires : pourObjectif).slice(0, 3);
  const adhesion = ADHESIONS[Number(rythme)] ?? ADHESIONS[1];
  const profil = PROFILS[objectif];

  return (
    <div className="overflow-hidden rounded-3xl bg-card shadow-[0_40px_80px_-40px_rgba(4,31,73,0.45)] ring-1 ring-border lg:grid lg:grid-cols-[19rem_1fr]">
      {/* Parcours : cœur et étapes */}
      <div className="relative overflow-hidden bg-primary p-6 text-white md:p-8">
        <span aria-hidden="true" className="absolute -right-16 -top-20 hidden h-44 w-44 rounded-full bg-jaune/90 lg:block" />
        <span aria-hidden="true" className="absolute -bottom-24 -right-14 hidden h-44 w-44 rounded-full bg-accent/80 lg:block" />

        <div className="relative flex items-center gap-5 lg:flex-col lg:items-start lg:gap-7">
          <Coeur progression={progression} bat={termine} />
          <div>
            <p className="text-sm text-white/70" aria-live="polite">
              {termine ? "Parcours terminé" : `Étape ${etape + 1} sur ${QUESTIONS.length}`}
            </p>
            <p className="mt-1 text-xl font-semibold leading-snug">
              {termine ? "Votre cœur est prêt à bouger" : "Chaque réponse fait battre le cœur"}
            </p>
          </div>
        </div>

        <ol className="relative mt-7 flex gap-2 lg:flex-col lg:gap-0">
          {QUESTIONS.map((question, index) => {
            const fait = index < etape;
            const actuel = index === etape;
            const choisi = fait ? question.choix.find((c) => c.valeur === reponses[index]) : undefined;
            return (
              <li key={question.etape} className="flex-1 lg:flex lg:gap-3">
                <div className="hidden lg:flex flex-col items-center">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300 ${
                      fait ? "bg-jaune text-jaune-foreground" : actuel ? "bg-white text-primary" : "bg-white/15 text-white/70"
                    }`}
                  >
                    {fait ? <Check aria-hidden="true" className="etape-anime h-4 w-4" /> : index + 1}
                  </span>
                  {index < QUESTIONS.length - 1 && (
                    <span className={`my-1 h-7 w-0.5 rounded-full transition-colors duration-500 ${fait ? "bg-jaune" : "bg-white/20"}`} />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => allerA(index)}
                  disabled={!fait}
                  aria-label={fait ? `Modifier : ${question.etape}, ${choisi?.libelle}` : question.etape}
                  className="block w-full text-left disabled:cursor-default lg:pt-1"
                >
                  <span className={`block h-1.5 rounded-full transition-colors duration-500 lg:hidden ${fait ? "bg-jaune" : actuel ? "bg-white" : "bg-white/20"}`} />
                  <span className={`mt-2 block text-sm font-semibold lg:mt-0 ${fait || actuel ? "text-white" : "text-white/55"}`}>
                    {question.etape}
                  </span>
                  <span className="block min-h-4 text-xs text-white/65">{choisi?.libelle ?? ""}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Question en cours ou résultat */}
      <div className="p-6 md:p-10" aria-live="polite">
        {!termine ? (
          <div key={etape} className="etape-anime">
            <div className="flex min-h-11 items-center justify-between gap-4">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-texte">{QUESTIONS[etape].etape}</p>
              {etape > 0 && (
                <button
                  type="button"
                  onClick={revenir}
                  className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                  Retour
                </button>
              )}
            </div>
            <h3 className="mt-1 text-2xl md:text-3xl font-semibold text-primary">{QUESTIONS[etape].titre}</h3>

            <div className={`mt-7 grid gap-3 sm:gap-4 ${QUESTIONS[etape].choix.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
              {QUESTIONS[etape].choix.map((choix, index) => {
                const Icone = choix.icone;
                const choisi = enCours === choix.valeur;
                return (
                  <button
                    key={choix.valeur}
                    type="button"
                    onClick={() => repondre(choix.valeur)}
                    style={{ animationDelay: `${index * 70}ms`, ["--couleur" as string]: choix.couleur }}
                    className={`carte-choix group relative flex items-center gap-4 overflow-hidden rounded-2xl border-2 bg-card p-4 text-left sm:flex-col sm:items-start sm:p-5 ${
                      choisi ? "carte-choix-prise" : enCours ? "opacity-40" : ""
                    }`}
                  >
                    <span className="carte-choix-pastille flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-2xl font-semibold text-white">
                      {choisi ? (
                        <Check aria-hidden="true" className="etape-anime h-7 w-7" />
                      ) : Icone ? (
                        <Icone aria-hidden="true" className="h-7 w-7" />
                      ) : (
                        choix.chiffre
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-lg font-semibold leading-snug text-primary">{choix.libelle}</span>
                      <span className="mt-0.5 block text-sm text-muted-foreground">{choix.detail}</span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 sm:absolute sm:right-5 sm:top-5"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="etape-anime relative">
            {/* Éclats de couleur à la révélation */}
            <span aria-hidden="true" className="eclats">
              {[JAUNE, ROUGE, TURQUOISE, ORANGE, BLEU, JAUNE, TURQUOISE, ROUGE].map((couleur, i) => (
                <i key={i} style={{ backgroundColor: couleur, ["--angle" as string]: `${i * 45}deg` }} />
              ))}
            </span>

            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-texte">Votre programme</p>
                <h3 className="mt-1 text-2xl md:text-3xl font-semibold text-primary">{profil?.nom ?? "Votre profil"}</h3>
                <p className="mt-1 text-muted-foreground">{profil?.phrase}</p>
              </div>
              <button
                type="button"
                onClick={() => setReponses([])}
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <RotateCcw aria-hidden="true" className="h-4 w-4" />
                Recommencer
              </button>
            </div>

            <div className="mt-7 grid gap-6 xl:grid-cols-[1.25fr_1fr]">
              <div>
                <p className="text-sm font-semibold text-primary">
                  {propositions.length > 1 ? "Les cours faits pour vous" : "Le cours fait pour vous"}
                </p>
                {auxBonsHoraires.length === 0 && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Aucun créneau ne correspond exactement à vos horaires. Voici les cours les plus proches de votre objectif.
                  </p>
                )}
                <ul className="mt-3 space-y-3">
                  {propositions.map((seance, index) => (
                    <li
                      key={`${seance.jour}-${seance.heure}`}
                      style={{ animationDelay: `${150 + index * 110}ms`, borderLeftColor: seance.couleur }}
                      className="billet flex items-center gap-4 rounded-2xl border border-border border-l-[6px] bg-card p-4"
                    >
                      {COACHS[seance.coach] && (
                        <img
                          src={COACHS[seance.coach].photo}
                          alt=""
                          width={48}
                          height={48}
                          className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
                        />
                      )}
                      <div className="min-w-0">
                        <p className="font-semibold text-primary">
                          {seance.titre}
                          {seance.coach && <span className="font-normal text-muted-foreground"> avec {seance.coach}</span>}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-semibold tabular-nums text-primary">
                            {seance.jour} · {seance.plage}
                          </span>
                          {seance.lieu ? ` · ${seance.lieu}` : ""}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="billet rounded-2xl bg-primary p-6 text-white" style={{ animationDelay: "480ms" }}>
                <p className="text-sm text-white/70">Adhésion conseillée</p>
                <p className="mt-1 flex items-baseline justify-between gap-3">
                  <span className="text-2xl font-semibold">{adhesion.nom}</span>
                  <span className="rounded bg-jaune px-2 py-0.5 text-sm font-semibold tabular-nums text-jaune-foreground">
                    {adhesion.annuel.prix} € / an
                  </span>
                </p>
                <p className="mt-1 text-sm text-white/70">{adhesion.rythme}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {["Premier mois gratuit, sans engagement", "Tous les cours accessibles pendant l'essai", "Club Prévention inclus"].map(
                    (point) => (
                      <li key={point} className="flex items-start gap-2">
                        <Check aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-jaune" />
                        {point}
                      </li>
                    ),
                  )}
                </ul>
                <Button asChild variant="gold" size="lg" className="mt-6 w-full">
                  {inscriptionDirecte ? (
                    <a href={LIEN_ESSAI}>
                      Démarrer mon essai gratuit
                      <ArrowRight aria-hidden="true" />
                    </a>
                  ) : (
                    <Link to="/essai-gratuit">
                      Essayer gratuitement
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  )}
                </Button>
                <Link
                  to="/tarifs"
                  className="mt-2 flex min-h-11 items-center justify-center text-sm font-medium text-white/75 hover:text-white"
                >
                  Voir tous les tarifs
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrouverMonCours;
