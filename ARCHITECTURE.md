# FELICIDADE COMMAND CENTER

## Objectif MVP

Construire une application web simple et orientee action pour :

- gerer les produits Amazon
- generer du contenu marketing multi-plateforme
- optimiser les listings Amazon
- generer des angles emotionnels
- generer des briefs visuels Canva
- preparer une file de publication compatible Make
- conserver un historique reutilisable

Le MVP se concentre sur le flux principal :

1. choisir un produit
2. generer du contenu
3. optimiser un listing
4. creer un brief visuel
5. envoyer en file de publication

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL, Auth, Storage)
- OpenAI API

## Principes d'architecture

- UI minimaliste et rapide
- logique metier separee de la presentation
- prompts IA versionnes et centralises
- routes API Next.js fines, services metier reutilisables
- tables normalisees cote Supabase
- MVP d'abord, extensible ensuite

## Structure projet cible

```text
felicidade-command-center/
  app/
    (dashboard)/
      page.tsx
    products/
      page.tsx
      [id]/
        page.tsx
    content/
      page.tsx
    listings/
      page.tsx
    angles/
      page.tsx
    visuals/
      page.tsx
    queue/
      page.tsx
    library/
      page.tsx
    api/
      products/route.ts
      products/[id]/route.ts
      generate-content/route.ts
      optimize-listing/route.ts
      generate-angles/route.ts
      generate-visual-brief/route.ts
      publishing-queue/route.ts
      priorities/route.ts
    layout.tsx
    globals.css
  components/
    layout/
      app-shell.tsx
      sidebar.tsx
      topbar.tsx
    dashboard/
      priority-card.tsx
      recent-content-list.tsx
      quick-actions.tsx
    products/
      product-table.tsx
      product-form.tsx
      product-detail-card.tsx
    content/
      content-generator-form.tsx
      content-result-card.tsx
    listings/
      listing-optimizer-form.tsx
      listing-result.tsx
    angles/
      angle-card.tsx
    visuals/
      visual-brief-form.tsx
      visual-brief-card.tsx
    queue/
      queue-table.tsx
      make-payload-preview.tsx
    library/
      library-filters.tsx
      library-list.tsx
    ui/
      button.tsx
      card.tsx
      input.tsx
      select.tsx
      textarea.tsx
      badge.tsx
      table.tsx
      dialog.tsx
      skeleton.tsx
  lib/
    supabase/
      client.ts
      server.ts
      middleware.ts
    openai/
      client.ts
    db/
      queries/
        products.ts
        generated-content.ts
        listing-versions.ts
        visual-briefs.ts
        publishing-queue.ts
        daily-priorities.ts
    services/
      products-service.ts
      content-service.ts
      listing-service.ts
      angles-service.ts
      visual-brief-service.ts
      queue-service.ts
      priority-service.ts
    prompts/
      content/
        v1.ts
      listing/
        v1.ts
      angles/
        v1.ts
      visual-brief/
        v1.ts
    validators/
      products.ts
      content.ts
      listings.ts
      visuals.ts
      queue.ts
    utils/
      scoring.ts
      make-payload.ts
      format.ts
      constants.ts
  supabase/
    migrations/
      0001_initial_schema.sql
      0002_seed.sql
    types/
      database.ts
  public/
    placeholder-product.jpg
  docs/
    architecture.md
    mvp-scope.md
  .env.example
  middleware.ts
  package.json
  tailwind.config.ts
  tsconfig.json
```

## Modules MVP

### 1. Produits

Inclure des le MVP :

- liste produits
- ajout / edition / suppression
- fiche detail produit
- filtres simples
- bouton vers generation contenu
- bouton vers optimisation listing

Reporter apres MVP :

- import CSV
- media produit avance
- versioning complet de la fiche produit

### 2. Generateur de contenu

Inclure des le MVP :

- choix produit
- choix plateforme
- ton
- objectif
- longueur
- nombre de variantes
- generation IA
- copie rapide
- sauvegarde en base
- score interne simple

Reporter apres MVP :

- A/B testing avance
- suggestions automatiques de calendrier
- benchmark concurrent

### 3. Optimiseur listing Amazon

Inclure des le MVP :

- saisie listing actuel
- mots-cles
- angle marketing
- generation titre
- 5 bullets
- description
- backend keywords
- scoring simple
- sauvegarde version

Reporter apres MVP :

- comparaison de versions
- audit SEO avance
- scraping marketplace

### 4. Angles emotionnels

Inclure des le MVP :

- generation de 12 angles
- affichage cartes
- sauvegarde

Reporter apres MVP :

- clustering automatique
- notation par performance reelle

### 5. Brief visuel

Inclure des le MVP :

- choix produit
- plateforme
- angle marketing
- generation brief Canva
- sauvegarde

Reporter apres MVP :

- variantes creatives multiples
- export direct Canva

### 6. Dashboard

Inclure des le MVP :

- top 3 produits prioritaires
- quick actions
- derniers contenus generes

Reporter apres MVP :

- analytics complexes
- widgets personnalisables

### 7. Queue publication

Inclure des le MVP :

- liste des contenus prets
- statut draft / ready / sent
- date de publication
- payload JSON Make

Reporter apres MVP :

- sync bidirectionnelle Make
- publication automatique multi-canal

### 8. Bibliotheque

Inclure des le MVP :

- historique filtre
- duplication
- reutilisation

Reporter apres MVP :

- classement par performance
- tagging intelligent IA

## Flux utilisateur MVP

### Flux 1 : contenu social

1. ouvrir un produit
2. cliquer sur "Generer contenu"
3. choisir plateforme + ton + objectif + longueur + variantes
4. generer
5. copier ou sauvegarder
6. envoyer en queue si utile

### Flux 2 : listing Amazon

1. ouvrir un produit
2. cliquer sur "Optimiser listing"
3. coller listing actuel + mots-cles + angle
4. generer
5. sauvegarder la version

### Flux 3 : brief visuel

1. choisir un produit
2. choisir plateforme + angle
3. generer brief
4. copier pour Canva ou joindre a la queue

## Architecture applicative

### Frontend

- App Router pour navigation par module
- server components pour chargement de donnees quand possible
- client components uniquement pour formulaires, interactions et copy actions
- design system leger avec composants reutilisables

### Backend

- routes API dans `app/api/*`
- validation des inputs avant appel service
- services responsables de la logique metier
- prompts centralises et versionnes
- acces base via couche `lib/db/queries`

### IA

- un service par cas d'usage
- prompt system + prompt user distincts
- sorties structurees JSON
- garde-fous sur claims Amazon / sante
- timeout cible court pour rester sous 10 secondes

## Donnees principales

### Tables coeur MVP

- `products`
- `generated_content`
- `listing_versions`
- `visual_briefs`
- `publishing_queue`
- `daily_priorities`

### Relation logique

- un produit possede plusieurs contenus generes
- un produit possede plusieurs versions de listing
- un produit possede plusieurs briefs visuels
- la queue peut referencer un contenu genere et un brief visuel
- les priorites quotidiennes pointent vers un produit

## Scoring MVP

### Score contenu

Combinaison simple :

- emotion
- clarte
- intensite CTA

### Score listing

Combinaison simple :

- couverture mots-cles
- clarte commerciale
- conformite Amazon

### Priorisation produit

Combinaison simple :

- marge
- stock_status
- bestseller_flag
- seasonality
- richesse emotionnelle
- priorite manuelle

## Authentification MVP

Phase 1 :

- auth email magic link via Supabase
- acces prive a un seul workspace marque

Peut etre simplifie au tout debut :

- login minimal protege

## Environnement

Variables prevues :

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`

## Decision produit pour demarrage

Pour aller vite sur le MVP, on demarre avec :

- une seule marque
- un seul espace de travail
- pas de roles complexes
- pas d'automatisation Make native, seulement generation du payload
- pas d'analytics avancees

## Prochaine etape proposee

Etape 2 :

- creation du schema Supabase
- tables
- relations
- index
- policies simples
- seed de donnees de demo
