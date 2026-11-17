import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { aujourdhuiAParis } from "@/config/carteCoeur";
import {
  ACTIVITES,
  COACHS,
  CRENEAUX,
  URL_ACTIVITES,
  URL_CRENEAUX,
  ajouterJours,
  anneeDe,
  enHeures,
  horaire,
  jourDuMois,
  lundiDe,
  moisDe,
  semaineDu,
  semaineType,
  type Activite,
  type Creneau,
  type JourPlanning,
} from "@/config/planning";

/**
 * Calendrier des cours, branché sur le planning de l'application.
 * Premier rendu : la semaine type de l'instantané (identique au pré-rendu).
 * Dans le navigateur : semaine réelle datée, navigation, données en direct.
 */

const PX_PAR_HEURE = 68;
const SEMAINES_A_VENIR = 8;
const LIEN_RESERVATION = "https://app.association-luciani.com/member/planning";

/** Couleur de l'activité en teinte légère (#RRGGBB + transparence). */
const teinte = (couleur: string, alpha: string) => `${couleur}${alpha}`;

const titreSemaine = (lundi: string) => {
  const dimanche = ajouterJours(lundi, 6);
  const memeMois = moisDe(lundi) === moisDe(dimanche);
  return `Semaine du ${jourDuMois(lundi)}${memeMois ? "" : ` ${moisDe(lundi)}`} au ${jourDuMois(dimanche)} ${moisDe(dimanche)} ${anneeDe(dimanche)}`;
};

const Planning = () => {
  const [creneaux, setCreneaux] = useState<Creneau[]>(CRENEAUX);
  const [activites, setActivites] = useState<Activite[]>(ACTIVITES);
  // Inconnus avant l'arrivée dans le navigateur : le premier rendu reste celui du pré-rendu.
  const [aujourdhui, setAujourdhui] = useState<string | null>(null);
  const [lundi, setLundi] = useState<string | null>(null);
  const [vue, setVue] = useState<"semaine" | "jour">("semaine");
  const [filtre, setFiltre] = useState<string | null>(null);
  const [indexJour, setIndexJour] = useState(0);
  const [selection, setSelection] = useState<string | null>(null);

  useEffect(() => {
    const jour = aujourdhuiAParis();
    setAujourdhui(jour);
    setLundi(lundiDe(jour));
    setIndexJour(Math.min((new Date(`${jour}T00:00:00Z`).getUTCDay() + 6) % 7, 4));

    // Planning en direct : en cas d'échec, l'instantané reste affiché.
    const abandon = new AbortController();
    const lire = (url: string) =>
      fetch(url, { signal: abandon.signal }).then((reponse) => (reponse.ok ? reponse.json() : Promise.reject()));
    Promise.all([
      lire(`${URL_CRENEAUX}?from=${jour}&to=${ajouterJours(jour, (SEMAINES_A_VENIR + 2) * 7)}`),
      lire(URL_ACTIVITES),
    ])
      .then(([nouveauxCreneaux, nouvellesActivites]) => {
        if (Array.isArray(nouveauxCreneaux) && nouveauxCreneaux.length > 0 && nouveauxCreneaux[0]?.activity) {
          setCreneaux(nouveauxCreneaux);
        }
        if (Array.isArray(nouvellesActivites) && nouvellesActivites.length > 0) setActivites(nouvellesActivites);
      })
      .catch(() => undefined);
    return () => abandon.abort();
  }, []);

  const semaine: JourPlanning[] = useMemo(
    () => (lundi ? semaineDu(creneaux, lundi) : semaineType(creneaux)),
    [creneaux, lundi],
  );
  // Du lundi au vendredi, plus le week-end seulement s'il y a des cours.
  const jours = semaine.filter((jour, index) => index < 5 || jour.creneaux.length > 0);
  const retenu = (creneau: Creneau) => !filtre || creneau.activity.id === filtre;
  const total = jours.reduce((n, jour) => n + jour.creneaux.filter(retenu).length, 0);

  // Plage horaire commune à toutes les semaines, pour que la grille ne saute pas.
  const [heureDebut, heureFin] = useMemo(() => {
    const debuts = creneaux.map((c) => enHeures(c.startTime));
    const fins = creneaux.map((c) => enHeures(c.endTime));
    return [Math.floor(Math.min(8, ...debuts)), Math.ceil(Math.max(19, ...fins))];
  }, [creneaux]);
  const heures = Array.from({ length: heureFin - heureDebut + 1 }, (_, i) => heureDebut + i);

  const premiereSemaine = aujourdhui ? lundiDe(aujourdhui) : null;
  const derniereSemaine = premiereSemaine ? ajouterJours(premiereSemaine, SEMAINES_A_VENIR * 7) : null;
  const changerSemaine = (sens: number) => {
    if (lundi) {
      setLundi(ajouterJours(lundi, sens * 7));
      setSelection(null);
    }
  };

  // Cours affiché dans la fiche : celui choisi, sinon le premier à venir de la semaine.
  const tous = jours.flatMap((jour) => jour.creneaux.map((creneau) => ({ jour, creneau })));
  const choisi =
    tous.find(({ jour, creneau }) => `${jour.date}-${creneau.id}` === selection) ??
    tous.find(({ jour }) => !jour.date || !aujourdhui || jour.date >= aujourdhui) ??
    tous[0];
  const cleChoisie = choisi ? `${choisi.jour.date}-${choisi.creneau.id}` : null;
  const description = (creneau: Creneau) => activites.find((a) => a.id === creneau.activity.id)?.description;
  const jourAffiche = jours[Math.min(indexJour, jours.length - 1)];

  const etiquetteJour = (jour: JourPlanning) =>
    jour.date ? `${jour.nom} ${jourDuMois(jour.date)} ${moisDe(jour.date)}` : jour.nom;

  /** Fiche d'un cours : description, horaire, lieu, coach, actions. */
  const fiche = choisi && (
    <aside
      key={cleChoisie}
      aria-live="polite"
      className="etape-anime sticky top-24 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--card-shadow)]"
    >
      <div className="h-1.5" style={{ backgroundColor: choisi.creneau.activity.color }} />
      <div className="p-6">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          {etiquetteJour(choisi.jour)}
        </p>
        <h3 className="mt-2 flex items-center gap-2.5 text-2xl font-semibold text-primary">
          <span
            aria-hidden="true"
            className="h-3 w-3 flex-shrink-0 rounded-full"
            style={{ backgroundColor: choisi.creneau.activity.color }}
          />
          {choisi.creneau.activity.name}
        </h3>
        {description(choisi.creneau) && <p className="mt-2 text-muted-foreground">{description(choisi.creneau)}</p>}

        <dl className="mt-5 space-y-3 border-y border-border py-5 text-sm">
          <div className="flex items-center gap-3">
            <dt className="sr-only">Horaire</dt>
            <Clock aria-hidden="true" className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
            <dd className="font-semibold tabular-nums text-primary">{horaire(choisi.creneau)}</dd>
          </div>
          {choisi.creneau.location && (
            <div className="flex items-start gap-3">
              <dt className="sr-only">Lieu</dt>
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
              <dd className="text-muted-foreground">{choisi.creneau.location}</dd>
            </div>
          )}
          {choisi.creneau.maxCapacity && (
            <div className="flex items-center gap-3">
              <dt className="sr-only">Effectif</dt>
              <Users aria-hidden="true" className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
              <dd className="text-muted-foreground">Petit groupe : {choisi.creneau.maxCapacity} places</dd>
            </div>
          )}
        </dl>

        {choisi.creneau.coach && (
          <div className="mt-5 flex items-center gap-3">
            {COACHS[choisi.creneau.coach.firstName] && (
              <img
                src={COACHS[choisi.creneau.coach.firstName].photo}
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-semibold text-primary">{choisi.creneau.coach.firstName}</p>
              <p className="text-sm text-muted-foreground">{COACHS[choisi.creneau.coach.firstName]?.role ?? "Coach"}</p>
            </div>
          </div>
        )}

        <Button asChild variant="cta" size="lg" className="mt-6 w-full">
          <Link to="/essai-gratuit">
            Essayer ce cours
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Premier mois gratuit, sans engagement.{" "}
          <a href={LIEN_RESERVATION} className="font-medium text-foreground underline underline-offset-2 hover:no-underline">
            Déjà adhérent ? Réserver
          </a>
        </p>
      </div>
    </aside>
  );

  /** Liste des cours d'un jour (vue Jour et mobile). */
  const listeDuJour = (jour: JourPlanning) => {
    const cours = jour.creneaux.filter(retenu);
    return (
      <ul key={`${jour.date}-${jour.nom}-${filtre}`} className="etape-anime space-y-3">
        {cours.map((creneau) => {
          const coach = creneau.coach ? COACHS[creneau.coach.firstName] : undefined;
          return (
            <li
              key={creneau.id}
              className="rounded-xl border border-border border-l-4 bg-card p-4 md:p-5"
              style={{ borderLeftColor: creneau.activity.color }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold tabular-nums text-muted-foreground">{horaire(creneau)}</p>
                  <h3 className="mt-0.5 text-lg font-semibold text-primary">{creneau.activity.name}</h3>
                  {description(creneau) && <p className="text-sm text-muted-foreground">{description(creneau)}</p>}
                </div>
                {coach && (
                  <img src={coach.photo} alt="" width={44} height={44} loading="lazy" className="h-11 w-11 flex-shrink-0 rounded-full object-cover" />
                )}
              </div>
              {creneau.coach && (
                <p className="mt-3 text-sm text-muted-foreground">
                  Avec <span className="font-medium text-foreground">{creneau.coach.firstName}</span>
                  {coach ? ` · ${coach.role}` : ""}
                </p>
              )}
              {creneau.location && (
                <p className="mt-1 flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  {creneau.location}
                </p>
              )}
              <Link to="/essai-gratuit" className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent">
                Essayer ce cours
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </li>
          );
        })}
        {cours.length === 0 && (
          <li className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Pas de cours ce jour-là.
          </li>
        )}
      </ul>
    );
  };

  /** Barre des jours (vue Jour et mobile). */
  const barreDesJours = (
    <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${jours.length}, minmax(0, 1fr))` }} role="tablist" aria-label="Jour de la semaine">
      {jours.map((jour, index) => {
        const actif = jour === jourAffiche;
        const nombre = jour.creneaux.filter(retenu).length;
        return (
          <button
            key={jour.nom}
            type="button"
            role="tab"
            aria-selected={actif}
            aria-label={`${etiquetteJour(jour)}, ${nombre} cours`}
            onClick={() => setIndexJour(index)}
            className={`flex h-[4.5rem] flex-col items-center justify-center rounded-xl border transition-colors duration-200 ${
              actif ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card text-primary hover:border-foreground/40"
            }`}
          >
            <span className={`text-xs font-medium ${actif ? "text-white/70" : "text-muted-foreground"}`}>{jour.nom.slice(0, 3)}</span>
            <span className="text-lg font-semibold tabular-nums leading-tight">{jour.date ? jourDuMois(jour.date) : nombre}</span>
            <span className="mt-0.5 flex h-1.5 gap-0.5" aria-hidden="true">
              {jour.creneaux.filter(retenu).slice(0, 4).map((c) => (
                <span key={c.id} className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.activity.color }} />
              ))}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div>
      {/* Barre d'outils : semaine, navigation, vue */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div>
          <p className="text-lg md:text-xl font-semibold text-primary" aria-live="polite">
            {lundi ? titreSemaine(lundi) : "Chaque semaine"}
          </p>
          <p className="text-sm text-muted-foreground">
            {total} cours{filtre ? " pour cette activité" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex rounded-lg border border-input p-1" role="group" aria-label="Affichage du calendrier">
            {(["semaine", "jour"] as const).map((nom) => (
              <button
                key={nom}
                type="button"
                onClick={() => setVue(nom)}
                aria-pressed={vue === nom}
                className={`h-9 rounded-md px-4 text-sm font-medium capitalize transition-colors duration-200 ${
                  vue === nom ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {nom}
              </button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => premiereSemaine && (setLundi(premiereSemaine), setSelection(null))}
            disabled={!lundi || lundi === premiereSemaine}
          >
            Aujourd'hui
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Semaine précédente"
            onClick={() => changerSemaine(-1)}
            disabled={!lundi || !premiereSemaine || lundi <= premiereSemaine}
          >
            <ChevronLeft aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Semaine suivante"
            onClick={() => changerSemaine(1)}
            disabled={!lundi || !derniereSemaine || lundi >= derniereSemaine}
          >
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
      </div>

      {/* Activités : légende et filtre */}
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filtrer par activité">
        <button
          type="button"
          onClick={() => setFiltre(null)}
          aria-pressed={!filtre}
          className={`h-10 rounded-full border px-4 text-sm font-medium transition-colors duration-200 ${
            !filtre ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card hover:border-foreground/40"
          }`}
        >
          Toutes les activités
        </button>
        {activites.map((activite) => {
          const actif = filtre === activite.id;
          return (
            <button
              key={activite.id}
              type="button"
              onClick={() => setFiltre(actif ? null : activite.id)}
              aria-pressed={actif}
              className="inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200"
              style={{
                borderColor: actif ? activite.color : "hsl(var(--input))",
                backgroundColor: actif ? teinte(activite.color, "1F") : "hsl(var(--card))",
              }}
            >
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: activite.color }} />
              {activite.name}
            </button>
          );
        })}
      </div>

      {/* Grand écran, vue Semaine : grille et fiche */}
      <div className={`mt-6 hidden ${vue === "semaine" ? "lg:grid" : ""} lg:grid-cols-[1fr_20rem] gap-6 items-start`}>
        <div key={lundi} className="etape-anime overflow-hidden rounded-2xl border border-border bg-card">
          <div className="grid border-b border-border" style={{ gridTemplateColumns: `3.75rem repeat(${jours.length}, minmax(0, 1fr))` }}>
            <div />
            {jours.map((jour) => {
              const duJour = !!jour.date && jour.date === aujourdhui;
              return (
                <div key={jour.nom} className={`border-l border-border px-3 py-3 text-center ${duJour ? "bg-[#F7ECEE]/70" : ""}`}>
                  <h3 className={`text-xs font-medium uppercase tracking-wider ${duJour ? "text-accent" : "text-muted-foreground"}`}>
                    {jour.nom}
                  </h3>
                  {jour.date && (
                    <p
                      className={`mx-auto mt-1 flex h-9 w-9 items-center justify-center rounded-full text-lg font-semibold tabular-nums ${
                        duJour ? "bg-accent text-accent-foreground" : "text-primary"
                      }`}
                    >
                      {jourDuMois(jour.date)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div
            className="grid"
            style={{
              gridTemplateColumns: `3.75rem repeat(${jours.length}, minmax(0, 1fr))`,
              height: (heureFin - heureDebut) * PX_PAR_HEURE + 28,
            }}
          >
            <div className="relative" aria-hidden="true">
              {heures.map((h) => (
                <span
                  key={h}
                  className="absolute right-3 -translate-y-1/2 text-xs tabular-nums text-muted-foreground"
                  style={{ top: (h - heureDebut) * PX_PAR_HEURE + 14 }}
                >
                  {h} h
                </span>
              ))}
            </div>
            {jours.map((jour) => {
              const passe = !!jour.date && !!aujourdhui && jour.date < aujourdhui;
              return (
                <div
                  key={jour.nom}
                  className={`relative border-l border-border ${jour.date && jour.date === aujourdhui ? "bg-[#F7ECEE]/40" : ""}`}
                  style={{
                    backgroundImage: "linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
                    backgroundSize: `100% ${PX_PAR_HEURE}px`,
                    backgroundPosition: "0 14px",
                  }}
                >
                  {jour.creneaux.map((creneau) => {
                    const debut = enHeures(creneau.startTime);
                    const fin = enHeures(creneau.endTime);
                    // Cours simultanés : côte à côte.
                    const simultanes = jour.creneaux.filter(
                      (autre) => enHeures(autre.startTime) < fin && enHeures(autre.endTime) > debut,
                    );
                    const rang = simultanes.indexOf(creneau);
                    const cle = `${jour.date}-${creneau.id}`;
                    const estChoisi = cle === cleChoisie;
                    return (
                      <button
                        key={creneau.id}
                        type="button"
                        onClick={() => setSelection(cle)}
                        aria-pressed={estChoisi}
                        aria-label={`${creneau.activity.name}, ${etiquetteJour(jour).toLowerCase()} de ${horaire(creneau)}${
                          creneau.coach ? `, avec ${creneau.coach.firstName}` : ""
                        }`}
                        className={`absolute overflow-hidden rounded-lg border-l-4 px-2.5 py-1.5 text-left transition-[opacity,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--card-shadow-hover)] ${
                          retenu(creneau) ? (passe ? "opacity-55" : "") : "opacity-20"
                        } ${estChoisi ? "shadow-[var(--card-shadow-hover)]" : ""}`}
                        style={{
                          top: (debut - heureDebut) * PX_PAR_HEURE + 15,
                          height: (fin - debut) * PX_PAR_HEURE - 3,
                          left: `calc(${(rang / simultanes.length) * 100}% + 5px)`,
                          width: `calc(${100 / simultanes.length}% - 10px)`,
                          borderLeftColor: creneau.activity.color,
                          backgroundColor: teinte(creneau.activity.color, estChoisi ? "38" : "1C"),
                          outline: estChoisi ? `2px solid ${creneau.activity.color}` : undefined,
                          outlineOffset: estChoisi ? "1px" : undefined,
                        }}
                      >
                        <span className="block truncate text-sm font-semibold leading-tight text-primary">
                          {creneau.activity.name}
                        </span>
                        <span className="block text-xs tabular-nums text-foreground/75">{horaire(creneau)}</span>
                        {creneau.coach && <span className="block truncate text-xs text-foreground/60">{creneau.coach.firstName}</span>}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        {fiche}
      </div>

      {/* Vue Jour sur grand écran, et affichage mobile */}
      <div className={`mt-6 ${vue === "semaine" ? "lg:hidden" : ""}`}>
        {barreDesJours}
        <div className="mt-4 lg:max-w-3xl">{jourAffiche && listeDuJour(jourAffiche)}</div>
      </div>
    </div>
  );
};

export default Planning;
