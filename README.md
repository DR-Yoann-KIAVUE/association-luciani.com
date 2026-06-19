# Association Luciani - Prevention & Sport Sante

Site vitrine de l'Association Luciani, dediee a la prevention sante, au sport-sante et aux formations de premiers secours.

## Stack technique

- **React 18** + **TypeScript**
- **Vite** (build & dev server)
- **Tailwind CSS** + **shadcn/ui** (composants UI)
- **React Router v6** (routing SPA)
- **Supabase** (backend & fonctions serverless)
- **TanStack React Query** (data fetching)
- **React Hook Form** + **Zod** (formulaires & validation)

## Installation

```bash
# Cloner le repo
git clone https://github.com/DR-Yoann-KIAVUE/association-luciani.com.git
cd association-luciani.com

# Installer les dependances
npm install

# Creer le fichier d'environnement
cp .env.example .env
# Remplir les variables dans .env (voir section ci-dessous)

# Lancer le serveur de dev
npm run dev
```

Le site sera accessible sur `http://localhost:8080`.

## Variables d'environnement

Creer un fichier `.env` a la racine avec :

```
VITE_SUPABASE_PROJECT_ID="votre-project-id"
VITE_SUPABASE_URL="https://votre-project-id.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="votre-cle-anon-supabase"
```

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de developpement |
| `npm run build` | Build de production |
| `npm run preview` | Preview du build de production |
| `npm run lint` | Linter ESLint |

## Deploiement

Le site est deploye sur **Vercel** avec deploiement automatique via GitHub :

- **Production** : push sur `main` → deploiement sur `association-luciani.com`
- **Preview** : push sur toute autre branche → URL de preview Vercel

## Licence

Tous droits reserves - Association Luciani
