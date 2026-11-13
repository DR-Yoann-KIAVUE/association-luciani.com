import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { PAGES, PAGE_INTROUVABLE, SITE_URL } from "@/config/seo";

/** Titre, description et adresse de référence de la page courante. */
const Seo = () => {
  const { pathname } = useLocation();
  const chemin = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  const page = PAGES[chemin];
  const { titre, description } = page ?? PAGE_INTROUVABLE;
  const url = `${SITE_URL}${chemin}`;

  return (
    <Helmet>
      <title>{titre}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={page ? "index, follow" : "noindex"} />
      {page && <link rel="canonical" href={url} />}
      <meta property="og:title" content={titre} />
      <meta property="og:description" content={description} />
      {page && <meta property="og:url" content={url} />}
      <meta name="twitter:title" content={titre} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default Seo;
