import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COACHS, PLANNING, horaire, type Cours } from "@/config/planning";

/**
 * Planning hebdomadaire en calendrier interactif.
 * Grand écran : grille jours × heures, un clic sur un cours ouvre sa fiche.
 * Mobile : un jour à la fois, choisi dans la barre des jours.
 */

const ACTIVITES = ["Tous", ...Array.from(new Set(PLANNING.flatMap(({ cours }) => cours.map((c) => c.titre))))];
const JOURS_SEMAINE = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

const HEURE_DEBUT = 8;
const HEURE_FIN = 19;
const PX_PAR_HEURE = 64;
const HEURES = Array.from({ length: HEURE_FIN - HEURE_DEBUT + 1 }, (_, i) => HEURE_DEBUT + i);

/** « 13:30 » → 13,5 */
const enHeures = (texte: string) => Number(texte.slice(0, 2)) + Number(texte.slice(3, 5)) / 60;
const bornes = (heure: string) => {
  const [debut, fin] = heure.split("-");
  return { debut: enHeures(debut), fin: enHeures(fin) };
};
const cle = (jour: string, seance: Cours) => `${jour}-${seance.heure}`;

/** Jour de la semaine à Paris, pour signaler les cours du jour. */
const jourAParis = () =>
  JOURS_SEMAINE[
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
      new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Paris", weekday: "short" }).format(new Date()),
    )
  ];

const Planning = () => {
  const [activite, setActivite] = useState("Tous");
  const [selection, setSelection] = useState(cle(PLANNING[0].jour, PLANNING[0].cours[0]));
  const [jourMobile, setJourMobile] = useState(PLANNING[0].jour);
  // Connu seulement dans le navigateur : le premier rendu reste identique au pré-rendu.
  const [aujourdhui, setAujourdhui] = useState<string | null>(null);

  useEffect(() => {
    const jour = jourAParis();
    setAujourdhui(jour);
    const duJour = PLANNING.find((j) => j.jour === jour);
    if (duJour) {
      setJourMobile(jour);
      setSelection(cle(jour, duJour.cours[0]));
    }
  }, []);

  const retenu = (seance: Cours) => activite === "Tous" || seance.titre === activite;
  const total = PLANNING.reduce((n, { cours }) => n + cours.filter(retenu).length, 0);

  const choisie = PLANNING.flatMap(({ jour, cours }) => cours.map((seance) => ({ jour, seance }))).find(
    ({ jour, seance }) => cle(jour, seance) === selection,
  )!;
  const coachChoisi = COACHS[choisie.seance.coach];
  const joursMobile = PLANNING.find((j) => j.jour === jourMobile)!;

  return (
    <div>
      {/* Filtre par activité */}
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrer le planning par activité">
        {ACTIVITES.map((nom) => {
          const actif = nom === activite;
          return (
            <button
              key={nom}
              type="button"
              onClick={() => setActivite(nom)}
              aria-pressed={actif}
              className={`h-11 rounded-md border px-4 text-sm font-medium transition-colors duration-200 ${
                actif
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-input bg-card text-foreground hover:border-foreground/40"
              }`}
            >
              {nom}
            </button>
          );
        })}
        <p className="ml-auto text-sm text-muted-foreground" aria-live="polite">
          {total} cours par semaine
        </p>
      </div>

      {/* Grand écran : calendrier et fiche du cours */}
      <div className="mt-5 hidden lg:grid lg:grid-cols-[1fr_19rem] gap-5 items-start">
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          {/* Jours */}
          <div className="grid grid-cols-[4rem_repeat(5,1fr)] border-b border-border">
            <div />
            {PLANNING.map(({ jour }) => {
              const duJour = jour === aujourdhui;
              return (
                <div key={jour} className={`border-l border-border px-3 py-3 ${duJour ? "bg-[#F7ECEE]/70" : ""}`}>
                  <h3 className={`text-sm font-semibold ${duJour ? "text-accent" : "text-primary"}`}>{jour}</h3>
                  <p className="h-4 text-xs font-medium text-accent">{duJour ? "Aujourd'hui" : ""}</p>
                </div>
              );
            })}
          </div>

          {/* Grille horaire */}
          <div
            className="grid grid-cols-[4rem_repeat(5,1fr)]"
            style={{ height: (HEURE_FIN - HEURE_DEBUT) * PX_PAR_HEURE + 24 }}
          >
            <div className="relative" aria-hidden="true">
              {HEURES.map((h) => (
                <span
                  key={h}
                  className="absolute right-3 -translate-y-1/2 text-xs tabular-nums text-muted-foreground"
                  style={{ top: (h - HEURE_DEBUT) * PX_PAR_HEURE + 12 }}
                >
                  {h} h
                </span>
              ))}
            </div>
            {PLANNING.map(({ jour, cours }) => (
              <div
                key={jour}
                className={`relative border-l border-border ${jour === aujourdhui ? "bg-[#F7ECEE]/40" : ""}`}
                style={{
                  backgroundImage: "linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
                  backgroundSize: `100% ${PX_PAR_HEURE}px`,
                  backgroundPosition: "0 12px",
                }}
              >
                {cours.map((seance) => {
                  const { debut, fin } = bornes(seance.heure);
                  const choisi = cle(jour, seance) === selection;
                  return (
                    <button
                      key={seance.heure}
                      type="button"
                      onClick={() => setSelection(cle(jour, seance))}
                      aria-pressed={choisi}
                      aria-label={`${seance.titre}, ${jour.toLowerCase()} de ${horaire(seance.heure)}, avec ${seance.coach}`}
                      className={`absolute inset-x-1.5 overflow-hidden rounded-lg border-l-[3px] px-2.5 py-1.5 text-left transition-[background-color,color,opacity,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--card-shadow-hover)] ${
                        choisi
                          ? "border-[#6E172C] bg-accent text-accent-foreground shadow-[var(--card-shadow-hover)]"
                          : "border-accent bg-[#F7ECEE] text-primary"
                      } ${retenu(seance) ? "" : "opacity-25"}`}
                      style={{
                        top: (debut - HEURE_DEBUT) * PX_PAR_HEURE + 13,
                        height: (fin - debut) * PX_PAR_HEURE - 3,
                      }}
                    >
                      <span className="block truncate text-sm font-semibold leading-tight">{seance.titre}</span>
                      <span className={`block text-xs tabular-nums ${choisi ? "text-white/85" : "text-accent"}`}>
                        {horaire(seance.heure)}
                      </span>
                      <span className={`block truncate text-xs ${choisi ? "text-white/75" : "text-muted-foreground"}`}>
                        {seance.coach}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Fiche du cours choisi */}
        <aside
          key={selection}
          aria-live="polite"
          className="etape-anime sticky top-24 rounded-xl border border-border bg-card p-6 shadow-[var(--card-shadow)]"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">{choisie.jour}</p>
          <h3 className="mt-2 text-2xl font-semibold text-primary">{choisie.seance.titre}</h3>
          <p className="mt-1 text-muted-foreground">{choisie.seance.description}</p>

          <dl className="mt-5 space-y-3 border-y border-border py-5 text-sm">
            <div className="flex items-center gap-3">
              <dt className="sr-only">Horaire</dt>
              <Clock aria-hidden="true" className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
              <dd className="font-semibold tabular-nums text-primary">{horaire(choisie.seance.heure)}</dd>
            </div>
            <div className="flex items-start gap-3">
              <dt className="sr-only">Lieu</dt>
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
              <dd className="text-muted-foreground">{choisie.seance.lieu}</dd>
            </div>
          </dl>

          {coachChoisi && (
            <div className="mt-5 flex items-center gap-3">
              <img
                src={coachChoisi.photo}
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-primary">{choisie.seance.coach}</p>
                <p className="text-sm text-muted-foreground">{coachChoisi.role}</p>
              </div>
            </div>
          )}

          <Button asChild variant="cta" size="lg" className="mt-6 w-full">
            <Link to="/essai-gratuit">
              Essayer ce cours
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">Premier mois gratuit, sans engagement</p>
        </aside>
      </div>

      {/* Mobile : un jour à la fois */}
      <div className="mt-5 lg:hidden">
        <div className="grid grid-cols-5 gap-1.5" role="tablist" aria-label="Jour de la semaine">
          {PLANNING.map(({ jour, cours }) => {
            const actif = jour === jourMobile;
            const nombre = cours.filter(retenu).length;
            return (
              <button
                key={jour}
                type="button"
                role="tab"
                aria-selected={actif}
                aria-label={`${jour}, ${nombre} cours`}
                onClick={() => setJourMobile(jour)}
                className={`flex h-16 flex-col items-center justify-center rounded-lg border text-sm font-semibold transition-colors duration-200 ${
                  actif ? "border-accent bg-accent text-accent-foreground" : "border-input bg-card text-primary"
                }`}
              >
                {jour.slice(0, 3)}
                <span className={`mt-0.5 text-xs font-medium tabular-nums ${actif ? "text-white/80" : "text-muted-foreground"}`}>
                  {jour === aujourdhui ? "Auj." : `${nombre} cours`}
                </span>
              </button>
            );
          })}
        </div>

        <ul key={`${jourMobile}-${activite}`} className="etape-anime mt-4 space-y-3">
          {joursMobile.cours.filter(retenu).map((seance) => {
            const coach = COACHS[seance.coach];
            return (
              <li key={seance.heure} className="rounded-xl border border-border border-l-[3px] border-l-accent bg-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold tabular-nums text-accent">{horaire(seance.heure)}</p>
                    <h3 className="mt-0.5 text-lg font-semibold text-primary">{seance.titre}</h3>
                    <p className="text-sm text-muted-foreground">{seance.description}</p>
                  </div>
                  {coach && (
                    <img
                      src={coach.photo}
                      alt=""
                      width={44}
                      height={44}
                      loading="lazy"
                      className="h-11 w-11 flex-shrink-0 rounded-full object-cover"
                    />
                  )}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Avec <span className="font-medium text-foreground">{seance.coach}</span>
                  {coach ? ` · ${coach.role}` : ""}
                </p>
                <p className="mt-1 flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  {seance.lieu}
                </p>
                <Link
                  to="/essai-gratuit"
                  className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent"
                >
                  Essayer ce cours
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </li>
            );
          })}
          {joursMobile.cours.filter(retenu).length === 0 && (
            <li className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              Pas de cours de {activite} le {jourMobile.toLowerCase()}.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Planning;
