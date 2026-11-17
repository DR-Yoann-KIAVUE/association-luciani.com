import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { COACHS, PLANNING, horaire } from "@/config/planning";

const ACTIVITES = ["Tous", ...Array.from(new Set(PLANNING.flatMap(({ cours }) => cours.map((c) => c.titre))))];
const JOURS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

/** Jour de la semaine à Paris, pour signaler les cours du jour. */
const jourAParis = () =>
  JOURS[
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
      new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Paris", weekday: "short" }).format(new Date()),
    )
  ];

/**
 * Planning hebdomadaire interactif : filtre par activité et repère « Aujourd'hui ».
 * `detail` ajoute la description de chaque cours.
 */
const Planning = ({ detail = false }: { detail?: boolean }) => {
  const [activite, setActivite] = useState("Tous");
  // Connu seulement dans le navigateur : le premier rendu reste identique au pré-rendu.
  const [aujourdhui, setAujourdhui] = useState<string | null>(null);
  useEffect(() => setAujourdhui(jourAParis()), []);

  const jours = PLANNING.map(({ jour, cours }) => ({
    jour,
    cours: cours.filter((c) => activite === "Tous" || c.titre === activite),
  })).filter(({ cours }) => cours.length > 0);
  const total = jours.reduce((n, { cours }) => n + cours.length, 0);

  return (
    <div>
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

      <div key={activite} className="etape-anime mt-5 overflow-hidden rounded-xl border border-border bg-card divide-y divide-border">
        {jours.map(({ jour, cours }) => {
          const duJour = jour === aujourdhui;
          return (
            <div key={jour} className={`grid md:grid-cols-[9rem_1fr] ${duJour ? "bg-[#F7ECEE]/60" : ""}`}>
              <h3 className="px-4 pt-4 md:px-6 md:py-5 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {jour}
                {duJour && (
                  <span className="ml-2 md:ml-0 md:mt-1 md:block text-xs font-semibold normal-case tracking-normal text-accent">
                    Aujourd'hui
                  </span>
                )}
              </h3>
              <ul className="divide-y divide-border">
                {cours.map((seance) => {
                  const coach = COACHS[seance.coach];
                  return (
                    <li
                      key={`${seance.titre}-${seance.heure}`}
                      className="group grid grid-cols-[7.5rem_1fr] md:grid-cols-[8rem_1.1fr_1fr_1.3fr_auto] items-center gap-x-4 gap-y-1 px-4 py-4 md:px-6 transition-colors duration-200 hover:bg-muted/60"
                    >
                      <p className="font-semibold tabular-nums whitespace-nowrap text-accent">{horaire(seance.heure)}</p>
                      <div>
                        <p className="text-lg font-semibold text-primary">{seance.titre}</p>
                        {detail && <p className="text-sm text-muted-foreground">{seance.description}</p>}
                      </div>
                      <div className="col-start-2 md:col-start-auto flex items-center gap-3 text-sm text-muted-foreground">
                        {coach && (
                          <img
                            src={coach.photo}
                            alt=""
                            width={36}
                            height={36}
                            loading="lazy"
                            decoding="async"
                            className="hidden md:block h-9 w-9 rounded-full object-cover"
                          />
                        )}
                        <span>
                          Avec <span className="font-medium text-foreground">{seance.coach}</span>
                          {coach && detail ? ` · ${coach.role}` : ""}
                        </span>
                      </div>
                      <p className="col-start-2 md:col-start-auto flex items-start gap-2 text-sm text-muted-foreground">
                        <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0" />
                        {seance.lieu}
                      </p>
                      <Link
                        to="/essai-gratuit"
                        aria-label={`Essayer le cours ${seance.titre} du ${jour.toLowerCase()} gratuitement`}
                        className="col-start-2 md:col-start-auto inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent md:opacity-0 md:transition-opacity md:duration-200 md:group-hover:opacity-100 md:focus-visible:opacity-100"
                      >
                        Essayer
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Planning;
