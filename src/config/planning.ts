import coachJb from "@/assets/coach-jb.png";
import coachLea from "@/assets/coach-lea.png";
import coachNoemie from "@/assets/coach-noemie.png";
import coachClarisse from "@/assets/coach-clarisse-new.jpg";
import instantane from "@/donnees/planning.json";

/**
 * Planning des cours. Les créneaux viennent de l'application (espace membre) :
 * un instantané est pris à chaque build (scripts/planning.mjs), puis le
 * calendrier le rafraîchit en direct dans le navigateur.
 */

export type Activite = { id: string; name: string; description: string | null; color: string };

export type Creneau = {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  maxCapacity: number | null;
  location: string | null;
  isRecurring: boolean;
  startDate: string | null;
  endDate: string | null;
  excludedDates: string[];
  activity: { id: string; name: string; color: string };
  coach: { firstName: string } | null;
};

export const ACTIVITES: Activite[] = instantane.activites;
export const CRENEAUX: Creneau[] = instantane.creneaux;

/** Adresses des données en direct, servies par le site lui-même (voir vercel.json). */
export const URL_CRENEAUX = "/donnees/creneaux";
export const URL_ACTIVITES = "/donnees/activites";

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

export const JOURS = [
  { cle: "MONDAY", nom: "Lundi" },
  { cle: "TUESDAY", nom: "Mardi" },
  { cle: "WEDNESDAY", nom: "Mercredi" },
  { cle: "THURSDAY", nom: "Jeudi" },
  { cle: "FRIDAY", nom: "Vendredi" },
  { cle: "SATURDAY", nom: "Samedi" },
  { cle: "SUNDAY", nom: "Dimanche" },
] as const;

/* ---------- Dates (AAAA-MM-JJ, sans fuseau) ---------- */

const enDate = (iso: string) => new Date(`${iso}T00:00:00Z`);
export const ajouterJours = (iso: string, jours: number) =>
  new Date(enDate(iso).getTime() + jours * 86400000).toISOString().slice(0, 10);
/** Lundi de la semaine qui contient ce jour. */
export const lundiDe = (iso: string) => ajouterJours(iso, -((enDate(iso).getUTCDay() + 6) % 7));

const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
export const jourDuMois = (iso: string) => enDate(iso).getUTCDate();
export const moisDe = (iso: string) => MOIS[enDate(iso).getUTCMonth()];
export const anneeDe = (iso: string) => enDate(iso).getUTCFullYear();

/** Affichage des horaires : « 08:00 – 09:00 ». */
export const horaire = (creneau: Pick<Creneau, "startTime" | "endTime">) => `${creneau.startTime} – ${creneau.endTime}`;
/** « 13:30 » → 13,5 */
export const enHeures = (texte: string) => Number(texte.slice(0, 2)) + Number(texte.slice(3, 5)) / 60;

const parHeure = (a: Creneau, b: Creneau) => a.startTime.localeCompare(b.startTime);

/** Créneaux qui ont réellement lieu ce jour-là (récurrence, date de fin, dates exclues). */
export const creneauxDu = (creneaux: Creneau[], iso: string) => {
  const cle = JOURS[(enDate(iso).getUTCDay() + 6) % 7].cle;
  return creneaux
    .filter((c) => {
      const debut = c.startDate?.slice(0, 10);
      const fin = c.endDate?.slice(0, 10);
      if (!c.isRecurring) return debut === iso;
      if (c.dayOfWeek !== cle || c.excludedDates.includes(iso)) return false;
      return (!debut || debut <= iso) && (!fin || fin >= iso);
    })
    .sort(parHeure);
};

/** Semaine type : les cours récurrents encore en vigueur, par jour. Sert au pré-rendu et au questionnaire. */
export const semaineType = (creneaux: Creneau[], aujourdhui: string = instantane.genereLe) =>
  JOURS.map(({ cle, nom }) => ({
    nom,
    date: null as string | null,
    creneaux: creneaux
      .filter((c) => c.isRecurring && c.dayOfWeek === cle && (!c.endDate || c.endDate.slice(0, 10) >= aujourdhui))
      .sort(parHeure),
  }));

/** Semaine datée à partir de son lundi. */
export const semaineDu = (creneaux: Creneau[], lundi: string) =>
  JOURS.map(({ nom }, index) => {
    const date = ajouterJours(lundi, index);
    return { nom, date: date as string | null, creneaux: creneauxDu(creneaux, date) };
  });

export type JourPlanning = ReturnType<typeof semaineType>[number];
