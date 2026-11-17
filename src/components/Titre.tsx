/** Titre de section centré : surtitre facultatif, titre H2, accroche et filet coloré. */
const Titre = ({ surtitre, titre, texte }: { surtitre?: string; titre: string; texte?: string }) => (
  <div className="mx-auto max-w-3xl text-center">
    {surtitre && <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-texte">{surtitre}</p>}
    <h2 className={`text-3xl md:text-[2.75rem] md:leading-[1.1] font-semibold text-primary ${surtitre ? "mt-3" : ""}`}>{titre}</h2>
    <span aria-hidden="true" className="filet-titre mx-auto mt-5 block h-1 w-16 rounded-full bg-jaune" />
    {texte && <p className="mt-5 text-lg text-muted-foreground">{texte}</p>}
  </div>
);

export default Titre;
