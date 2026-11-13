/** Référencement : adresse du site et balises propres à chaque page. */

export const SITE_URL = "https://www.association-luciani.fr";

export type PageSeo = { titre: string; description: string };

/** Une entrée par route publique. Sert aussi au pré-rendu et au sitemap. */
export const PAGES: Record<string, PageSeo> = {
  "/": {
    titre: "Sport santé et prévention cardio à Saint-Raphaël | LUCIANI",
    description:
      "Cours de sport santé encadrés, initiations aux gestes qui sauvent et prévention cardiovasculaire à Saint-Raphaël (Var). Association fondée par un cardiologue.",
  },
  "/sport-sante": {
    titre: "Cours de sport santé à Saint-Raphaël | Association LUCIANI",
    description:
      "Séances collectives encadrées par des coachs diplômés, adaptées à tous les niveaux : endurance, renforcement et bien-être cardio. Mois d'essai gratuit.",
  },
  "/formations": {
    titre: "Initiation aux gestes qui sauvent à Saint-Raphaël | LUCIANI",
    description:
      "Initiations de 2 h pour adultes, associations, entreprises et scolaires : alerter, masser, défibriller. Animées dans le Var par l'Association LUCIANI.",
  },
  "/tarifs": {
    titre: "Tarifs et adhésions | Association LUCIANI, Saint-Raphaël",
    description:
      "Adhésions annuelles de 149 € à 219 € ou mensuelles dès 15 €, Club Prévention à 99 € par an et Carte Cœur à offrir : tous les tarifs de l'Association LUCIANI.",
  },
  "/pack-prevention": {
    titre: "Club Prévention : webinaires et conférences cardio | LUCIANI",
    description:
      "Webinaires, conférences et contenus sur la prévention cardiovasculaire, animés par un cardiologue. Rejoignez le Club Prévention pour 99 € par an.",
  },
  "/a-propos": {
    titre: "À propos de l'Association LUCIANI, Saint-Raphaël",
    description:
      "Association de prévention cardiovasculaire fondée par le Dr Yoann Kiavue, cardiologue à Saint-Raphaël : notre engagement, nos valeurs et nos actions dans le Var.",
  },
  "/contact": {
    titre: "Contact | Association LUCIANI, Saint-Raphaël",
    description:
      "Une question, un projet de formation ou d'intervention en entreprise ? Contactez l'Association LUCIANI, 87 avenue Archimède, 83700 Saint-Raphaël.",
  },
  "/essai-gratuit": {
    titre: "Mois d'essai gratuit en sport santé | Association LUCIANI",
    description:
      "Testez gratuitement pendant un mois les cours de sport santé encadrés de l'Association LUCIANI à Saint-Raphaël. Inscription en quelques clics.",
  },
  "/inscription-club-prevention": {
    titre: "Inscription au Club Prévention | Association LUCIANI",
    description:
      "Inscrivez-vous au Club Prévention pour accéder aux webinaires, conférences et contenus exclusifs sur la prévention cardiovasculaire.",
  },
  "/mentions-legales": {
    titre: "Mentions légales | Association LUCIANI",
    description:
      "Mentions légales du site de l'Association LUCIANI : éditeur, hébergeur et modalités de paiement.",
  },
  "/politique-confidentialite": {
    titre: "Politique de confidentialité | Association LUCIANI",
    description:
      "Comment l'Association LUCIANI collecte, utilise et protège vos données personnelles.",
  },
  "/rgpd": {
    titre: "RGPD et protection des données | Association LUCIANI",
    description:
      "Vos droits sur vos données personnelles et la façon dont l'Association LUCIANI applique le RGPD.",
  },
};

export const PAGE_INTROUVABLE: PageSeo = {
  titre: "Page introuvable | Association LUCIANI",
  description: "Cette page n'existe pas ou a été déplacée.",
};
