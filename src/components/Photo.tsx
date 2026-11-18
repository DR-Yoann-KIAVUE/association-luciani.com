import type { ImgHTMLAttributes } from "react";
import plageAvif from "@/assets/illustration-plage.avif";
import plageJpg from "@/assets/illustration-plage.jpg";
import sportAvif from "@/assets/illustration-sport.avif";
import sportJpg from "@/assets/illustration-sport.jpg";
import secoursAvif from "@/assets/illustration-secours.avif";
import secoursJpg from "@/assets/illustration-secours.jpg";
import conferenceAvif from "@/assets/illustration-conference.avif";
import conferenceJpg from "@/assets/illustration-conference.jpg";

/** Illustrations du site : version AVIF légère, avec repli JPEG. */
export const PHOTOS = {
  plage: { avif: plageAvif, jpg: plageJpg, alt: "Cours de sport santé en plein air, en bord de mer" },
  sport: { avif: sportAvif, jpg: sportJpg, alt: "Cours collectif de sport santé encadré par un coach" },
  secours: { avif: secoursAvif, jpg: secoursJpg, alt: "Initiation au massage cardiaque sur mannequin" },
  conference: { avif: conferenceAvif, jpg: conferenceJpg, alt: "Conférence de prévention cardiovasculaire" },
} as const;

export type NomPhoto = keyof typeof PHOTOS;

type PhotoProps = { nom: NomPhoto; alt?: string } & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">;

const Photo = ({ nom, alt, ...attributs }: PhotoProps) => (
  <picture className="contents">
    <source srcSet={PHOTOS[nom].avif} type="image/avif" />
    <img src={PHOTOS[nom].jpg} alt={alt ?? PHOTOS[nom].alt} decoding="async" {...attributs} />
  </picture>
);

export default Photo;
