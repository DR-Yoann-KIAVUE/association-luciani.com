/** Adhésions Sport & Santé : source unique pour la page Tarifs et le questionnaire. */

export const INSCRIPTION = "https://app.association-luciani.com/register?planId=";
export const LIEN_ESSAI = `${INSCRIPTION}ae932234-ac5e-4ee9-b190-5864b063fb05`;

export const ADHESIONS = [
  {
    nom: "Découverte",
    accroche: "Pour débuter en douceur",
    rythme: "1 cours / semaine",
    repere: "à moins de 3 euros par cours",
    annuel: { prix: "149", plan: "56aa4743-8ce2-4f8a-88d0-51528d36e7d2" },
    mensuel: { prix: "15", plan: "1f87af7e-7787-4b17-ba4b-f6e785542776" },
  },
  {
    nom: "Standard",
    accroche: "Pour découvrir nos activités",
    rythme: "2 cours / semaine",
    repere: "à moins de 2 euros par cours",
    annuel: { prix: "199", plan: "d67d313a-2000-4ed1-8cae-20fa56eaca7f" },
    mensuel: { prix: "19", plan: "5c7f7657-96fc-4aef-86e5-5ceb4e022d3b" },
  },
  {
    nom: "Illimitée",
    accroche: "Pour les plus motivés",
    rythme: "Cours illimités",
    repere: "à moins de 1 euro par cours",
    annuel: { prix: "219", plan: "699b4c98-1dff-4459-a888-20fc277c14c7" },
    mensuel: { prix: "22", plan: "9a1e070c-7129-48b5-b63b-cbca731e197c" },
    // Formule la plus souscrite d'après les abonnements réels (13 actifs sur 21 au 18 nov. 2026).
    populaire: true,
  },
];
