import coachJb from "@/assets/coach-jb.png";
import coachLea from "@/assets/coach-lea.png";
import coachNoemie from "@/assets/coach-noemie.png";
import coachClarisse from "@/assets/coach-clarisse-new.jpg";

/** Planning des cours : source unique pour l'accueil et la page Sport & Santé. */

export type Cours = { titre: string; heure: string; coach: string; lieu: string; description: string };

export const COACHS: Record<string, { role: string; specialite: string; bio: string; photo: string }> = {
  Noémie: {
    role: "Kinésithérapeute",
    specialite: "Pilates",
    bio: "Masseur-kinésithérapeute diplômée d'État et professeur de Pilates. Posture, mobilité, respiration.",
    photo: coachNoemie,
  },
  Clarisse: {
    role: "Coach APA",
    specialite: "Circuit training",
    bio: "Coach APA proposant des cours en circuit training. Renfo global, fun et efficace.",
    photo: coachClarisse,
  },
  "Jean-Baptiste": {
    role: "Coach",
    specialite: "Cardio / Cardio Renfo",
    bio: "Coach et ancien athlète de natation, ancien champion de France en 4x200m. Endurance accessible et progressive.",
    photo: coachJb,
  },
  Léa: {
    role: "Coach APA",
    specialite: "Yoga",
    bio: "Coach APA proposant des cours de yoga. Souffle, souplesse et récupération.",
    photo: coachLea,
  },
};

const CLINIQUE = "Clinique Cardio-Vasculaire Raphaëloise";

export const PLANNING: { jour: string; cours: Cours[] }[] = [
  {
    jour: "Lundi",
    cours: [
      { titre: "Pilates", heure: "08:00-09:00", coach: "Noémie", lieu: CLINIQUE, description: "Posture, mobilité, respiration" },
      { titre: "Pilates", heure: "09:00-10:00", coach: "Noémie", lieu: CLINIQUE, description: "Posture, mobilité, respiration" },
      { titre: "Circuit training", heure: "13:30-14:30", coach: "Clarisse", lieu: CLINIQUE, description: "Renfo global, fun et efficace" },
    ],
  },
  {
    jour: "Mardi",
    cours: [
      { titre: "Cardio", heure: "11:30-12:30", coach: "Jean-Baptiste", lieu: CLINIQUE, description: "Endurance accessible et progressive" },
    ],
  },
  {
    jour: "Mercredi",
    cours: [
      { titre: "Cardio Renfo", heure: "10:00-11:00", coach: "Jean-Baptiste", lieu: "Plage du Débarquement, Saint-Raphaël", description: "Cardio en plein air face à la mer" },
    ],
  },
  {
    jour: "Jeudi",
    cours: [
      { titre: "Yoga", heure: "18:00-19:00", coach: "Léa", lieu: CLINIQUE, description: "Souffle, souplesse et récupération" },
    ],
  },
  {
    jour: "Vendredi",
    cours: [
      { titre: "Circuit training", heure: "15:00-16:00", coach: "Clarisse", lieu: CLINIQUE, description: "Entraînement complet et dynamique" },
    ],
  },
];

/** Affichage des horaires : « 08:00 – 09:00 ». */
export const horaire = (heure: string) => heure.replace("-", " – ");
