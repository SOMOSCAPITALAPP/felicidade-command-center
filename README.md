# FELICIDADE COMMAND CENTER

Cockpit marketing et commercial pour une marque Amazon de bijoux en pierres naturelles.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase
- OpenAI API

## MVP actuel

- base produits
- generateur de contenu multi-plateforme
- optimiseur listing Amazon
- generateur d angles emotionnels
- generateur de brief visuel
- dashboard priorites
- queue publication
- bibliotheque simple

## Variables d environnement

Copier `.env.example` puis renseigner :

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`

## Demarrage local

```bash
npm install
npm run dev
```

## Base de donnees

Les migrations Supabase sont dans :

- `supabase/migrations/0001_initial_schema.sql`
- `supabase/migrations/0002_seed.sql`

## Deploiement Vercel

Le projet est prepare pour un deploiement Vercel standard sur Next.js.

1. Creer un depot GitHub
2. Pousser ce dossier vers GitHub
3. Importer le repo dans Vercel
4. Ajouter les variables d environnement
5. Deployer
