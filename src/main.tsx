import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

const conteneur = document.getElementById("root")!;
const application = (
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

// En production, chaque page arrive déjà pré-rendue : React reprend le HTML existant.
if (conteneur.hasChildNodes()) {
  hydrateRoot(conteneur, application);
} else {
  createRoot(conteneur).render(application);
}
