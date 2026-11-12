import carteWebp from "@/assets/carte-coeur.webp";
import cartePng from "@/assets/carte-coeur.png";
import { FORMULES, GRILLE, LIEN_OFFRIR, OFFRE_PHARE } from "@/config/carteCoeur";

const reperes = [
  { titre: "Quand", texte: "Pour Noël, les fêtes et les anniversaires" },
  { titre: "Prix", texte: "De 45 € à 219 €, payé une fois" },
  { titre: "Sans e-mail", texte: "Activation possible à l'accueil" },
];

/** Section « La Carte Cœur » : abonnement à offrir à un proche. */
const CarteCoeurSection = () => (
  <section
    id="carte-coeur"
    aria-labelledby="titre-carte-coeur"
    className="py-20 bg-[#FAFAFA] border-y border-[#E6E6E6] text-[#161616] font-['Geist',sans-serif]"
  >
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A12E3C]">Offrir un abonnement</p>
          <h2
            id="titre-carte-coeur"
            className="mt-3 text-5xl md:text-6xl font-extralight tracking-tight leading-none font-['Geist',sans-serif]"
          >
            La Carte <span className="font-semibold text-[#A12E3C]">Cœur</span>
          </h2>
          <p className="mt-5 text-xl md:text-2xl font-light leading-snug max-w-md">
            Offrez à ceux que vous aimez un cœur en pleine forme.
          </p>
          <p className="mt-5 text-[#5E5E5E] leading-relaxed max-w-xl">
            Un abonnement LUCIANI à offrir à un parent, un grand-parent ou un ami, qu'il soit déjà adhérent ou non.
            3 mois, 6 mois ou 1 an, en formule Découverte, Standard ou Illimitée. Une carte élégante à imprimer,
            ou un <span className="whitespace-nowrap">e-mail</span> qui arrive le jour J. Le proche active son cadeau quand il le souhaite, sans rien payer.
          </p>

          <dl className="mt-8 grid sm:grid-cols-3 border-t border-[#E6E6E6]">
            {reperes.map((r, i) => (
              <div
                key={r.titre}
                className={`py-4 sm:pr-4 ${i > 0 ? "border-t sm:border-t-0 sm:border-l border-[#E6E6E6] sm:pl-4" : ""}`}
              >
                <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#5E5E5E]">{r.titre}</dt>
                <dd className="mt-1 text-[15px] font-medium leading-snug">{r.texte}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-5">
            <a
              href={LIEN_OFFRIR}
              className="inline-flex items-center justify-center h-12 px-8 rounded-md bg-[#A12E3C] text-white font-semibold hover:bg-[#8A2533] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A12E3C]"
            >
              Offrir la Carte Cœur
            </a>
            <p className="text-[#5E5E5E]">
              {OFFRE_PHARE.duree} en formule {OFFRE_PHARE.formule} :{" "}
              <span className="text-[#161616] font-semibold whitespace-nowrap">{OFFRE_PHARE.prix} €</span>
            </p>
          </div>
        </div>

        <div>
          <picture>
            <source srcSet={carteWebp} type="image/webp" />
            <img
              src={cartePng}
              alt="Carte Cœur LUCIANI : un an, formule Standard, deux cours par semaine"
              width={900}
              height={596}
              loading="lazy"
              className="w-full max-w-[520px] h-auto mx-auto"
            />
          </picture>

          <table className="mt-6 w-full max-w-[520px] mx-auto text-sm tabular-nums">
            <caption className="sr-only">Prix de la Carte Cœur selon la durée et la formule, payés une fois</caption>
            <thead>
              <tr className="border-b border-[#161616]">
                <th scope="col" className="py-2 text-left text-[11px] font-medium uppercase tracking-[0.12em] text-[#5E5E5E]">
                  Durée
                </th>
                {FORMULES.map((f) => (
                  <th key={f} scope="col" className="py-2 text-right text-[11px] font-medium uppercase tracking-[0.12em] text-[#5E5E5E]">
                    {f}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GRILLE.map((ligne) => (
                <tr key={ligne.duree} className="border-b border-[#E6E6E6]">
                  <th scope="row" className="py-3 text-left font-medium">
                    {ligne.duree}
                  </th>
                  {ligne.prix.map((prix, i) => {
                    const phare = ligne.duree === OFFRE_PHARE.duree && FORMULES[i] === OFFRE_PHARE.formule;
                    return (
                      <td key={FORMULES[i]} className={`py-3 text-right ${phare ? "font-semibold text-[#A12E3C]" : ""}`}>
                        {prix} €
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 max-w-[520px] mx-auto text-xs text-[#5E5E5E]">Payé une fois, sans prélèvement.</p>
        </div>
      </div>
    </div>
  </section>
);

export default CarteCoeurSection;
