// La Carte Cœur : abonnement LUCIANI à offrir.
// Tout ce qui peut changer (lien, prix, campagnes du bandeau) est réuni ici.

/** Lien de tous les boutons « Offrir ». Le paramètre src=site sert à mesurer l'origine des achats. */
export const LIEN_OFFRIR = "https://app.association-luciani.com/offrir?src=site";

export const FORMULES = ["Découverte", "Standard", "Illimitée"] as const;

/** Grille payée une fois, sans prélèvement. */
export const GRILLE = [
  { duree: "3 mois", prix: [45, 57, 66] },
  { duree: "6 mois", prix: [90, 114, 132] },
  { duree: "1 an", prix: [149, 199, 219] },
] as const;

/** Offre mise en avant : 1 an, formule Standard. */
export const OFFRE_PHARE = { duree: "1 an", formule: "Standard", prix: 199 } as const;

export type Campagne = {
  id: string;
  /** Texte du bandeau. */
  message: string;
  /** Premier et dernier jour d'affichage, inclus, au format AAAA-MM-JJ (heure de Paris). */
  debut: string;
  fin: string;
  /** Une campagne inactive n'est jamais affichée, même pendant sa période. */
  active: boolean;
};

/** Campagnes du bandeau saisonnier. Pour réutiliser le bandeau : passer `active` à true. */
export const CAMPAGNES: Campagne[] = [
  { id: "noel-2026", message: "Pour Noël, offrez la Carte Cœur", debut: "2026-12-01", fin: "2026-12-25", active: true },
  { id: "nouvel-an-2027", message: "Pour la nouvelle année, offrez la Carte Cœur", debut: "2026-12-28", fin: "2027-01-01", active: false },
  { id: "saint-valentin-2027", message: "Pour la Saint-Valentin, offrez la Carte Cœur", debut: "2027-01-27", fin: "2027-02-14", active: false },
  { id: "grands-meres-2027", message: "Pour la fête des grands-mères, offrez la Carte Cœur", debut: "2027-02-15", fin: "2027-03-07", active: false },
  { id: "meres-2027", message: "Pour la fête des mères, offrez la Carte Cœur", debut: "2027-05-10", fin: "2027-05-30", active: false },
  { id: "peres-2027", message: "Pour la fête des pères, offrez la Carte Cœur", debut: "2027-05-31", fin: "2027-06-20", active: false },
  { id: "grands-peres-2027", message: "Pour la fête des grands-pères, offrez la Carte Cœur", debut: "2027-09-13", fin: "2027-10-03", active: false },
];

/** Date du jour à Paris, au format AAAA-MM-JJ. */
export const aujourdhuiAParis = (date: Date = new Date()): string =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);

/** Campagne à afficher pour un jour donné (AAAA-MM-JJ), ou undefined. */
export const campagneDuJour = (jour: string): Campagne | undefined =>
  CAMPAGNES.find((c) => c.active && c.debut <= jour && jour <= c.fin);
