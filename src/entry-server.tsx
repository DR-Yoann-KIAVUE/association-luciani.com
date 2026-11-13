import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import App from "./App";

export { PAGES, SITE_URL } from "./config/seo";

/** Rend une page en HTML pour le pré-rendu au moment du build. */
export function render(url: string) {
  const contexte: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <HelmetProvider context={contexte}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
  );
  const { helmet } = contexte;
  const head = helmet
    ? [helmet.title, helmet.meta, helmet.link, helmet.script].map((balises) => balises.toString()).join("\n    ")
    : "";
  return { html, head };
}
