// Instantané du planning : lit les activités et les créneaux publics de l'application
// et les enregistre dans src/donnees/planning.json avant le build.
// En cas d'échec (réseau, application indisponible), l'instantané précédent est conservé.
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const API = "https://api.association-luciani.com/api/public/associations/83ee3212-978c-4b9e-af12-4074ee83b3a5";
const sortie = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/donnees/planning.json");

const jour = (decalage) => new Date(Date.now() + decalage * 86400000).toISOString().slice(0, 10);
const lire = async (chemin) => {
  const reponse = await fetch(`${API}${chemin}`, { signal: AbortSignal.timeout(15000) });
  if (!reponse.ok) throw new Error(`${chemin} : ${reponse.status}`);
  return reponse.json();
};

try {
  const [activites, creneaux] = await Promise.all([
    lire("/activities"),
    lire(`/class-slots?from=${jour(0)}&to=${jour(77)}`),
  ]);
  if (!Array.isArray(activites) || !Array.isArray(creneaux) || creneaux.length === 0) {
    throw new Error("réponse vide ou inattendue");
  }
  const instantane = {
    genereLe: jour(0),
    activites: activites.map(({ id, name, description, color }) => ({ id, name, description, color })),
    // Seuls les champs utiles à l'affichage sont conservés (prénom du coach uniquement).
    creneaux: creneaux.map((c) => ({
      id: c.id,
      dayOfWeek: c.dayOfWeek,
      startTime: c.startTime,
      endTime: c.endTime,
      maxCapacity: c.maxCapacity,
      location: c.location,
      isRecurring: c.isRecurring,
      startDate: c.startDate,
      endDate: c.endDate,
      excludedDates: c.excludedDates ?? [],
      activity: { id: c.activity.id, name: c.activity.name, color: c.activity.color },
      coach: c.coach ? { firstName: c.coach.firstName } : null,
    })),
  };
  await writeFile(sortie, JSON.stringify(instantane, null, 2) + "\n");
  console.log(`planning : ${instantane.creneaux.length} créneaux, ${instantane.activites.length} activités`);
} catch (erreur) {
  console.warn(`planning : instantané précédent conservé (${erreur.message})`);
}
