import { useEffect, useRef } from "react";

/**
 * Fond animé des en-têtes : formes organiques qui dérivent et se déforment
 * lentement, dans les tons de la charte, avec un halo qui suit le pointeur.
 * Purement décoratif ; immobile si l'utilisateur préfère réduire les animations.
 */
// Noms complets : ils doivent apparaître tels quels pour être conservés dans la feuille de style.
const TONS = { rouge: "fond-rouge", sport: "fond-sport", marine: "fond-marine" } as const;

const FondVivant = ({ ton = "rouge" }: { ton?: keyof typeof TONS }) => {
  const calque = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = calque.current;
    const zone = element?.parentElement;
    if (!element || !zone || !window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) {
      return;
    }
    let image = 0;
    const suivre = (evenement: PointerEvent) => {
      cancelAnimationFrame(image);
      image = requestAnimationFrame(() => {
        const cadre = zone.getBoundingClientRect();
        element.style.setProperty("--halo-x", `${evenement.clientX - cadre.left}px`);
        element.style.setProperty("--halo-y", `${evenement.clientY - cadre.top}px`);
        element.style.setProperty("--halo-opacite", "1");
      });
    };
    const quitter = () => element.style.setProperty("--halo-opacite", "0");
    zone.addEventListener("pointermove", suivre);
    zone.addEventListener("pointerleave", quitter);
    return () => {
      cancelAnimationFrame(image);
      zone.removeEventListener("pointermove", suivre);
      zone.removeEventListener("pointerleave", quitter);
    };
  }, []);

  return (
    <div ref={calque} aria-hidden="true" className={`fond-vivant ${TONS[ton]} pointer-events-none absolute inset-0 overflow-hidden`}>
      <span className="forme forme-1" />
      <span className="forme forme-2" />
      <span className="forme forme-3" />
      <span className="forme forme-4" />
      <span className="halo" />
    </div>
  );
};

export default FondVivant;
