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
  creneauxDu,
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
 * Présentation : panneau clair, repères bleu nuit et jaune, blocs à la couleur de chaque activité.
 */

const PX_PAR_HEURE = 64;
const SEMAINES_A_VENIR = 8;
const LIEN_RESERVATION = "https://app.association-luciani.com/member/planning";
const INITIALES = ["L", "M", "M", "J", "V", "S", "D"];

/** Texte lisible sur la couleur d'une activité : bleu nuit sur les teintes claires, blanc sinon. */
const texteSur = (couleur: string) => {
  const [r, v, b] = [1, 3, 5].map((i) => {
    const canal = parseInt(couleur.slice(i, i + 2), 16) / 255;
    return canal <= 0.03928 ? canal / 12.92 : Math.pow((canal + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * v + 0.0722 * b > 0.36 ? "#041F49" : "#FFFFFF";
};

const titreSemaine = (lundi: string) => {
  const dimanche = ajouterJours(lundi, 6);
  const memeMois = moisDe(lundi) === moisDe(dimanche);
  return `Semaine du ${jourDuMois(lundi)}${memeMois ? "" : ` ${moisDe(lundi)}`} au ${jourDuMois(dimanche)} ${moisDe(dimanche)} ${anneeDe(dimanche)}`;
};

const bouton =
  "inline-flex h-10 items-center justify-center rounded-full border border-input bg-card text-sm font-medium text-foreground transition-colors duration-200 hover:border-foreground/40 disabled:pointer-events-none disabled:opacity-40";
const panneau = "rounded-2xl bg-card p-4 ring-1 ring-border";

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
  const allerA = (nouveauLundi: string) => {
    if (!premiereSemaine || !derniereSemaine || nouveauLundi < premiereSemaine || nouveauLundi > derniereSemaine) return;
    setLundi(nouveauLundi);
    setSelection(null);
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

  // Mois affiché dans le mini-calendrier : celui du jeudi de la semaine en cours.
  const reference = lundi ? ajouterJours(lundi, 3) : null;
  const moisAffiche = useMemo(() => {
    if (!reference) return [];
    const debut = lundiDe(`${reference.slice(0, 8)}01`);
    return Array.from({ length: 6 }, (_, semaineIndex) =>
      Array.from({ length: 7 }, (_, jourIndex) => ajouterJours(debut, semaineIndex * 7 + jourIndex)),
    ).filter((ligne) => ligne.some((date) => date.slice(0, 7) === reference.slice(0, 7)));
  }, [reference]);

  // Prochains cours, à partir d'aujourd'hui.
  const prochains = useMemo(() => {
    if (!aujourdhui) return [];
    return Array.from({ length: 14 }, (_, i) => ajouterJours(aujourdhui, i))
      .flatMap((date) => creneauxDu(creneaux, date).map((creneau) => ({ date, creneau })))
      .slice(0, 4);
  }, [aujourdhui, creneaux]);

  /** Fiche d'un cours : description, horaire, lieu, coach, actions. */
  const fiche = choisi && (
    <aside
      key={cleChoisie}
      aria-live="polite"
      className="etape-anime overflow-hidden rounded-2xl bg-card shadow-[0_24px_50px_-28px_rgba(4,31,73,0.45)] ring-1 ring-border"
    >
      <div className="h-2" style={{ backgroundColor: choisi.creneau.activity.color }} />
      <div className="p-6">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{etiquetteJour(choisi.jour)}</p>
        <h3 className="mt-2 text-2xl font-semibold text-primary">{choisi.creneau.activity.name}</h3>
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
            <li key={creneau.id} className="overflow-hidden rounded-2xl bg-card ring-1 ring-border">
              <div className="grid grid-cols-[5.25rem_1fr]">
                <div
                  className="flex flex-col items-center justify-center px-2 py-4 text-center"
                  style={{ backgroundColor: creneau.activity.color, color: texteSur(creneau.activity.color) }}
                >
                  <span className="text-lg font-semibold tabular-nums leading-tight">{creneau.startTime}</span>
                  <span className="text-xs tabular-nums opacity-85">{creneau.endTime}</span>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-primary">{creneau.activity.name}</h3>
                      {description(creneau) && <p className="text-sm text-muted-foreground">{description(creneau)}</p>}
                    </div>
                    {coach && (
                      <img src={coach.photo} alt="" width={40} height={40} loading="lazy" className="h-10 w-10 flex-shrink-0 rounded-full object-cover" />
                    )}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {creneau.coach && (
                      <>
                        Avec <span className="font-medium text-foreground">{creneau.coach.firstName}</span>
                        {coach ? ` · ${coach.role}` : ""}
                      </>
                    )}
                    {creneau.location && <span className="block">{creneau.location}</span>}
                  </p>
                  <Link to="/essai-gratuit" className="mt-1 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent-texte">
                    Essayer ce cours
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
        {cours.length === 0 && (
          <li className="rounded-2xl border border-dashed border-input bg-card p-8 text-center text-sm text-muted-foreground">
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
        const cours = jour.creneaux.filter(retenu);
        return (
          <button
            key={jour.nom}
            type="button"
            role="tab"
            aria-selected={actif}
            aria-label={`${etiquetteJour(jour)}, ${cours.length} cours`}
            onClick={() => setIndexJour(index)}
            className={`flex h-[4.75rem] flex-col items-center justify-center rounded-2xl transition-colors duration-200 ${
              actif ? "bg-primary text-primary-foreground" : "bg-card text-primary ring-1 ring-border hover:ring-foreground/30"
            }`}
          >
            <span className={`text-xs font-medium ${actif ? "text-white/70" : "text-muted-foreground"}`}>{jour.nom.slice(0, 3)}</span>
            <span className="text-lg font-semibold tabular-nums leading-tight">{jour.date ? jourDuMois(jour.date) : cours.length}</span>
            <span className="mt-1 flex h-1.5 gap-0.5" aria-hidden="true">
              {cours.slice(0, 4).map((c) => (
                <span key={c.id} className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.activity.color }} />
              ))}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="relative rounded-[1.75rem] bg-muted p-4 ring-1 ring-border sm:p-6 lg:p-8 xl:left-1/2 xl:w-[min(86rem,calc(100vw-4rem))] xl:-translate-x-1/2">
      {/* Barre d'outils : semaine, navigation, vue */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
        <div>
          <p className="text-xl md:text-2xl font-semibold text-primary" aria-live="polite">
            {lundi ? titreSemaine(lundi) : "Chaque semaine"}
          </p>
          <p className="text-sm text-muted-foreground">
            {total} cours{filtre ? " pour cette activité" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex rounded-full bg-card p-1 ring-1 ring-border" role="group" aria-label="Affichage du calendrier">
            {(["semaine", "jour"] as const).map((nom) => (
              <button
                key={nom}
                type="button"
                onClick={() => setVue(nom)}
                aria-pressed={vue === nom}
                className={`h-8 rounded-full px-5 text-sm font-medium capitalize transition-colors duration-200 ${
                  vue === nom ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {nom}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={`${bouton} px-4`}
            onClick={() => premiereSemaine && allerA(premiereSemaine)}
            disabled={!lundi || lundi === premiereSemaine}
          >
            Aujourd'hui
          </button>
          <button
            type="button"
            className={`${bouton} w-10`}
            aria-label="Semaine précédente"
            onClick={() => lundi && allerA(ajouterJours(lundi, -7))}
            disabled={!lundi || !premiereSemaine || lundi <= premiereSemaine}
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          </button>
          <button
            type="button"
            className={`${bouton} w-10`}
            aria-label="Semaine suivante"
            onClick={() => lundi && allerA(ajouterJours(lundi, 7))}
            disabled={!lundi || !derniereSemaine || lundi >= derniereSemaine}
          >
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Activités : légende et filtre */}
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filtrer par activité">
        <button
          type="button"
          onClick={() => setFiltre(null)}
          aria-pressed={!filtre}
          className={`h-10 rounded-full px-4 text-sm font-medium transition-colors duration-200 ${
            !filtre ? "bg-primary text-primary-foreground" : "bg-card text-foreground ring-1 ring-border hover:ring-foreground/30"
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
              className={`inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors duration-200 ${
                actif ? "" : "bg-card text-foreground ring-1 ring-border hover:ring-foreground/30"
              }`}
              style={actif ? { backgroundColor: activite.color, color: texteSur(activite.color) } : undefined}
            >
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: actif ? texteSur(activite.color) : activite.color }}
              />
              {activite.name}
            </button>
          );
        })}
      </div>

      {/* Grand écran, vue Semaine : repères, grille et fiche */}
      <div className={`mt-7 hidden ${vue === "semaine" ? "lg:grid" : ""} lg:grid-cols-[1fr_18.5rem] xl:grid-cols-[14rem_1fr_19rem] gap-6 items-start`}>
        {/* Mini-calendrier et prochains cours */}
        <div className="hidden xl:block space-y-5">
          <div className={panneau}>
            <p className="text-sm font-semibold capitalize text-primary">
              {reference ? `${moisDe(reference)} ${anneeDe(reference)}` : "Semaine type"}
            </p>
            <div className="mt-3 grid grid-cols-7 gap-y-1 text-center text-xs">
              {INITIALES.map((initiale, i) => (
                <span key={i} className="text-muted-foreground">
                  {initiale}
                </span>
              ))}
              {moisAffiche.map((ligne) => {
                const semaineChoisie = ligne[0] === lundi;
                const accessible = !!premiereSemaine && !!derniereSemaine && ligne[0] >= premiereSemaine && ligne[0] <= derniereSemaine;
                return ligne.map((date, i) => {
                  const duMois = date.slice(0, 7) === reference?.slice(0, 7);
                  const duJour = date === aujourdhui;
                  return (
                    <button
                      key={date}
                      type="button"
                      disabled={!accessible}
                      onClick={() => allerA(ligne[0])}
                      aria-label={`Afficher la semaine du ${jourDuMois(ligne[0])} ${moisDe(ligne[0])}`}
                      tabIndex={i === 0 ? 0 : -1}
                      className={`flex h-7 items-center justify-center tabular-nums transition-colors duration-200 disabled:cursor-default ${
                        semaineChoisie ? "bg-primary/10" : accessible ? "hover:bg-muted" : ""
                      } ${semaineChoisie && i === 0 ? "rounded-l-full" : ""} ${semaineChoisie && i === 6 ? "rounded-r-full" : ""} ${
                        duMois ? (accessible ? "text-primary" : "text-muted-foreground/60") : "text-muted-foreground/35"
                      }`}
                    >
                      <span className={duJour ? "flex h-6 w-6 items-center justify-center rounded-full bg-jaune font-semibold text-jaune-foreground" : ""}>
                        {jourDuMois(date)}
                      </span>
                    </button>
                  );
                });
              })}
            </div>
          </div>

          {prochains.length > 0 && (
            <div className={panneau}>
              <p className="text-sm font-semibold text-primary">Prochains cours</p>
              <ul className="mt-3 space-y-3">
                {prochains.map(({ date, creneau }) => (
                  <li key={`${date}-${creneau.id}`} className="flex items-start gap-2.5 text-sm">
                    <span aria-hidden="true" className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: creneau.activity.color }} />
                    <span>
                      <span className="block font-medium leading-tight text-primary">{creneau.activity.name}</span>
                      <span className="block text-xs tabular-nums text-muted-foreground">
                        {date === aujourdhui ? "Aujourd'hui" : `${jourDuMois(date)} ${moisDe(date)}`} · {creneau.startTime}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Grille de la semaine */}
        <div key={lundi} className="etape-anime">
          <div className="grid gap-1.5" style={{ gridTemplateColumns: `2.75rem repeat(${jours.length}, minmax(0, 1fr))` }}>
            <div />
            {jours.map((jour) => {
              const duJour = !!jour.date && jour.date === aujourdhui;
              return (
                <div
                  key={jour.nom}
                  className={`rounded-full py-2 text-center text-sm font-medium ${
                    duJour ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground ring-1 ring-border"
                  }`}
                >
                  <h3 className="inline">{jour.nom.slice(0, 3)}</h3>
                  {jour.date && <span className={`ml-1.5 font-semibold tabular-nums ${duJour ? "" : "text-primary"}`}>{jourDuMois(jour.date)}</span>}
                </div>
              );
            })}
          </div>

          <div
            className="mt-2 grid gap-x-1.5"
            style={{
              gridTemplateColumns: `2.75rem repeat(${jours.length}, minmax(0, 1fr))`,
              height: (heureFin - heureDebut) * PX_PAR_HEURE + 24,
            }}
          >
            <div className="relative" aria-hidden="true">
              {heures.map((h) => (
                <span
                  key={h}
                  className="absolute right-2 -translate-y-1/2 text-xs tabular-nums text-muted-foreground"
                  style={{ top: (h - heureDebut) * PX_PAR_HEURE + 12 }}
                >
                  {h} h
                </span>
              ))}
            </div>
            {jours.map((jour) => {
              const passe = !!jour.date && !!aujourdhui && jour.date < aujourdhui;
              const duJour = !!jour.date && jour.date === aujourdhui;
              return (
                <div
                  key={jour.nom}
                  className={`relative rounded-xl bg-card ${duJour ? "ring-2 ring-jaune" : "ring-1 ring-border"}`}
                  style={{
                    backgroundImage: "linear-gradient(to bottom, hsl(var(--border) / 0.7) 1px, transparent 1px)",
                    backgroundSize: `100% ${PX_PAR_HEURE}px`,
                    backgroundPosition: "0 12px",
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
                        className={`absolute overflow-hidden rounded-xl px-2.5 py-1.5 text-left shadow-sm transition-[opacity,transform,box-shadow] duration-200 hover:z-10 hover:scale-[1.04] hover:shadow-lg ${
                          retenu(creneau) ? (passe ? "opacity-45" : "") : "opacity-15"
                        } ${estChoisi ? "z-10 ring-2 ring-primary ring-offset-2 ring-offset-card" : ""}`}
                        style={{
                          top: (debut - heureDebut) * PX_PAR_HEURE + 13,
                          height: (fin - debut) * PX_PAR_HEURE - 3,
                          left: `calc(${(rang / simultanes.length) * 100}% + 3px)`,
                          width: `calc(${100 / simultanes.length}% - 6px)`,
                          backgroundColor: creneau.activity.color,
                          color: texteSur(creneau.activity.color),
                        }}
                      >
                        <span className="block truncate text-sm font-semibold leading-tight">{creneau.activity.name}</span>
                        <span className="block text-xs tabular-nums opacity-90">{horaire(creneau)}</span>
                        {creneau.coach && <span className="block truncate text-xs opacity-80">{creneau.coach.firstName}</span>}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <div className="sticky top-24">{fiche}</div>
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
