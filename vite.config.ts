import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
// Planning en direct : mêmes adresses qu'en production (réécritures de vercel.json).
const API_PLANNING = "https://api.association-luciani.com";
const ASSOCIATION = "/api/public/associations/83ee3212-978c-4b9e-af12-4074ee83b3a5";
const proxy = {
  "/donnees/creneaux": { target: API_PLANNING, changeOrigin: true, rewrite: (chemin: string) => chemin.replace("/donnees/creneaux", `${ASSOCIATION}/class-slots`) },
  "/donnees/activites": { target: API_PLANNING, changeOrigin: true, rewrite: (chemin: string) => chemin.replace("/donnees/activites", `${ASSOCIATION}/activities`) },
};

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy,
  },
  preview: { proxy },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  ssr: {
    // Paquets publiés en CommonJS : intégrés au rendu serveur pour l'import ESM de Node.
    noExternal: ["react-helmet-async"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
