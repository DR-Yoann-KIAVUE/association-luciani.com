import { MapPin } from "lucide-react";
import { COACHS, PLANNING, horaire } from "@/config/planning";

/** Planning hebdomadaire, regroupé par jour. `detail` ajoute la description de chaque cours. */
const Planning = ({ detail = false }: { detail?: boolean }) => (
  <div className="overflow-hidden rounded-xl border border-border bg-card divide-y divide-border">
    {PLANNING.map(({ jour, cours }) => (
      <div key={jour} className="grid md:grid-cols-[9rem_1fr]">
        <h3 className="px-4 pt-4 md:px-6 md:py-5 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {jour}
        </h3>
        <ul className="divide-y divide-border">
          {cours.map((seance) => {
            const coach = COACHS[seance.coach];
            return (
              <li
                key={`${seance.titre}-${seance.heure}`}
                className="grid grid-cols-[7.5rem_1fr] md:grid-cols-[8rem_1.1fr_1fr_1.3fr] items-center gap-x-4 gap-y-1 px-4 py-4 md:px-6"
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
              </li>
            );
          })}
        </ul>
      </div>
    ))}
  </div>
);

export default Planning;
