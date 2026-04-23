# Supabase Setup

## Contenu

- `migrations/0001_initial_schema.sql` : schema initial MVP
- `migrations/0002_seed.sql` : donnees de demonstration

## Tables creees

- `products`
- `generated_content`
- `listing_versions`
- `visual_briefs`
- `publishing_queue`
- `daily_priorities`
- `marketing_angles`

## Choix MVP

- politiques RLS simples pour utilisateurs authentifies
- une seule marque / un seul espace logique
- champs optimises pour les usages marketing immediats
- stockage JSON uniquement la ou cela accelere le produit

## Application dans Supabase

1. Creer un projet Supabase.
2. Ouvrir le SQL Editor.
3. Executer `0001_initial_schema.sql`.
4. Executer `0002_seed.sql`.

## Notes d'implementation

- `listing_versions.bullet_points` est en `jsonb` pour stocker proprement les 5 bullets.
- `publishing_queue.make_payload` est en `jsonb` pour conserver le payload pret a envoyer a Make.
- `marketing_angles` est ajoutee au schema bien qu elle ne soit pas dans la liste initiale des tables, car le module "angles emotionnels" a besoin d'un stockage propre et exploitable.
- la fonction `calculate_product_priority_score` sert de base au moteur de priorisation cote app et peut etre reproduite en TypeScript pour garder une logique miroir.
