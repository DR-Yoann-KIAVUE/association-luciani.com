import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ADHESIONS, LIEN_ESSAI } from "@/config/adhesions";
import { COACHS, PLANNING, horaire } from "@/config/planning";

/** Questionnaire en trois étapes : propose des cours du planning et une adhésion. */

const QUESTIONS = [
  {
    cle: "objectif",
    titre: "Quel est votre objectif ?",
    choix: [
      { valeur: "souffle", libelle: "Retrouver du souffle", detail: "Endurance accessible et progressive" },
      { valeur: "force", libelle: "Me renforcer", detail: "Renforcement global, à votre rythme" },
      { valeur: "souplesse", libelle: "Gagner en souplesse", detail: "Souffle, souplesse et récupération" },
      { valeur: "posture", libelle: "Soigner ma posture", detail: "Posture, mobilité, respiration" },
    ],
  },
  {
    cle: "moment",
    titre: "Quand êtes-vous disponible ?",
    choix: [
      { valeur: "matin", libelle: "Le matin", detail: "Avant midi" },
      { valeur: "midi", libelle: "En journée", detail: "Entre midi et 17 h" },
      { valeur: "soir", libelle: "En fin de journée", detail: "À partir de 17 h" },
      { valeur: "tous", libelle: "Peu importe", detail: "Je m'adapte" },
    ],
  },
  {
    cle: "rythme",
    titre: "À quel rythme souhaitez-vous pratiquer ?",
    choix: [
      { valeur: "0", libelle: "1 cours par semaine", detail: "Pour débuter en douceur" },
      { valeur: "1", libelle: "2 cours par semaine", detail: "Pour découvrir nos activités" },
      { valeur: "2", libelle: "Autant que possible", detail: "Pour les plus motivés" },
    ],
  },
] as const;

const COURS_PAR_OBJECTIF: Record<string, string[]> = {
  souffle: ["Cardio", "Cardio Renfo"],
  force: ["Circuit training", "Cardio Renfo"],
  souplesse: ["Yoga", "Pilates"],
  posture: ["Pilates", "Yoga"],
};

const auBonMoment = (heure: string, moment: string) => {
  const debut = Number(heure.slice(0, 2));
  if (moment === "matin") return debut < 12;
  if (moment === "midi") return debut >= 12 && debut < 17;
  if (moment === "soir") return debut >= 17;
  return true;
};

/** `inscriptionDirecte` : le bouton final mène au formulaire d'inscription plutôt qu'à la page d'essai. */
const TrouverMonCours = ({ inscriptionDirecte = false }: { inscriptionDirecte?: boolean }) => {
  const [reponses, setReponses] = useState<string[]>([]);
  const etape = reponses.length;
  const termine = etape === QUESTIONS.length;

  const repondre = (valeur: string) => setReponses([...reponses, valeur]);
  const revenir = () => setReponses(reponses.slice(0, -1));

  const [objectif, moment, rythme] = reponses;
  const seances = PLANNING.flatMap(({ jour, cours }) => cours.map((c) => ({ ...c, jour })));
  const pourObjectif = seances.filter((s) => COURS_PAR_OBJECTIF[objectif]?.includes(s.titre));
  const auxBonsHoraires = pourObjectif.filter((s) => auBonMoment(s.heure, moment));
  const propositions = (auxBonsHoraires.length > 0 ? auxBonsHoraires : pourObjectif).slice(0, 3);
  const adhesion = ADHESIONS[Number(rythme)] ?? ADHESIONS[1];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--card-shadow)]">
      {/* Progression */}
      <div className="h-1 bg-muted" aria-hidden="true">
        <div
          className="h-full bg-accent transition-[width] duration-500 ease-out"
          style={{ width: `${(etape / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <div className="p-6 md:p-10" aria-live="polite">
        {!termine ? (
          <div key={etape} className="etape-anime">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium tabular-nums text-muted-foreground">
                Question {etape + 1} sur {QUESTIONS.length}
              </p>
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
            <h3 className="mt-2 text-2xl md:text-3xl font-semibold text-primary">{QUESTIONS[etape].titre}</h3>
            <div className={`mt-6 grid gap-3 ${QUESTIONS[etape].choix.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
              {QUESTIONS[etape].choix.map((choix) => (
                <button
                  key={choix.valeur}
                  type="button"
                  onClick={() => repondre(choix.valeur)}
                  className="group flex min-h-20 items-center justify-between gap-4 rounded-xl border border-input bg-background p-5 text-left transition-[border-color,background-color,transform] duration-200 hover:border-accent hover:bg-[#F7ECEE]/50 active:scale-[0.99]"
                >
                  <span>
                    <span className="block font-semibold text-primary">{choix.libelle}</span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">{choix.detail}</span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-[color,transform] duration-200 group-hover:translate-x-1 group-hover:text-accent"
                  />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="etape-anime grid lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-12">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Votre programme</p>
              <h3 className="mt-2 text-2xl md:text-3xl font-semibold text-primary">
                {propositions.length > 1 ? "Les cours faits pour vous" : "Le cours fait pour vous"}
              </h3>
              {auxBonsHoraires.length === 0 && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Aucun créneau ne correspond exactement à vos horaires. Voici les cours les plus proches de votre objectif.
                </p>
              )}
              <ul className="mt-6 divide-y divide-border border-y border-border">
                {propositions.map((seance) => (
                  <li key={`${seance.jour}-${seance.heure}`} className="flex items-center gap-4 py-4">
                    <img
                      src={COACHS[seance.coach]?.photo}
                      alt=""
                      width={44}
                      height={44}
                      className="h-11 w-11 flex-shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-primary">
                        {seance.titre} <span className="font-normal text-muted-foreground">avec {seance.coach}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium tabular-nums text-accent">
                          {seance.jour} · {horaire(seance.heure)}
                        </span>{" "}
                        · {seance.lieu}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setReponses([])}
                className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <RotateCcw aria-hidden="true" className="h-4 w-4" />
                Recommencer
              </button>
            </div>

            <div className="rounded-xl bg-muted/70 p-6 md:p-7">
              <p className="text-sm text-muted-foreground">Adhésion conseillée</p>
              <p className="mt-1 text-2xl font-semibold text-primary">{adhesion.nom}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {adhesion.rythme} · {adhesion.annuel.prix} € par an
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                {["Premier mois gratuit, sans engagement", "Tous les cours accessibles pendant l'essai", "Club Prévention inclus"].map(
                  (point) => (
                    <li key={point} className="flex items-start gap-2">
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                      {point}
                    </li>
                  ),
                )}
              </ul>
              <Button asChild variant="cta" size="lg" className="mt-6 w-full">
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
                className="mt-3 flex min-h-11 items-center justify-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Voir tous les tarifs
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrouverMonCours;
