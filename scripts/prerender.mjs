// Pré-rendu : écrit une page HTML complète par route, la page 404 et le sitemap.
// Lancé après `vite build` (client) et `vite build --ssr` (serveur).
import { readFile, writeFile, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(racine, "dist");
const serveur = path.join(racine, "dist-ssr", "entry-server.js");

const { render, PAGES, SITE_URL } = await import(pathToFileURL(serveur).href);
const modele = await readFile(path.join(dist, "index.html"), "utf8");

if (!modele.includes('<div id="root"></div>') || !modele.includes("</head>")) {
  throw new Error("Modèle index.html inattendu : impossible d'insérer le pré-rendu.");
}

const pageComplete = (url) => {
  const { html, head } = render(url);
  if (!html.includes("<h1")) throw new Error(`Aucun titre H1 rendu pour ${url}`);
  return modele
    .replace("</head>", `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
};

// Fichier servi par Vercel pour chaque route (cleanUrls : /tarifs -> tarifs.html).
const fichierPour = (chemin) => (chemin === "/" ? "index.html" : `${chemin.slice(1)}.html`);

for (const chemin of Object.keys(PAGES)) {
  await writeFile(path.join(dist, fichierPour(chemin)), pageComplete(chemin));
  console.log(`pré-rendu ${chemin}`);
}

await writeFile(path.join(dist, "404.html"), pageComplete("/page-introuvable"));
console.log("pré-rendu 404");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.keys(PAGES)
  .map((chemin) => `  <url><loc>${SITE_URL}${chemin}</loc></url>`)
  .join("\n")}
</urlset>
`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap);
console.log("sitemap.xml");

await rm(path.join(racine, "dist-ssr"), { recursive: true, force: true });
