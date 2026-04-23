import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { demoContents, demoListingVersions, demoVisualBriefs } from "@/lib/data/demo-store";
import {
  fetchGeneratedContent,
  fetchListingVersions,
  fetchVisualBriefs,
} from "@/lib/supabase/queries";
import { hasSupabase } from "@/lib/services/runtime-service";
import { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils/format";

export async function ProductDetailView({ product }: { product: Product }) {
  const relatedContent = hasSupabase()
    ? await fetchGeneratedContent(product.id)
    : demoContents.filter((item) => item.product_id === product.id).slice(0, 3);
  const relatedListings = hasSupabase()
    ? await fetchListingVersions(product.id)
    : demoListingVersions.filter((item) => item.product_id === product.id).slice(0, 1);
  const relatedBriefs = hasSupabase()
    ? await fetchVisualBriefs(product.id)
    : demoVisualBriefs.filter((item) => item.product_id === product.id).slice(0, 1);

  return (
    <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
      <Card className="p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge>{product.asin}</Badge>
              <Badge>{product.brand}</Badge>
              <Badge>{product.stock_status}</Badge>
            </div>
            <h4 className="mt-4 text-2xl font-semibold">{product.name}</h4>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
              {product.notes || "Produit central du cockpit marketing Felicidade."}
            </p>
          </div>
          <div className="flex gap-3">
            <Link href={`/content?productId=${product.id}`}>
              <Button>Generer contenu</Button>
            </Link>
            <Link href="/listings">
              <Button variant="secondary">Optimiser listing</Button>
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-line bg-white/70 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Pierre</p>
            <p className="mt-2 text-lg font-semibold">{product.main_stone}</p>
          </div>
          <div className="rounded-2xl border border-line bg-white/70 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Audience</p>
            <p className="mt-2 text-lg font-semibold">{product.audience}</p>
          </div>
          <div className="rounded-2xl border border-line bg-white/70 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Prix</p>
            <p className="mt-2 text-lg font-semibold">{formatCurrency(product.price)}</p>
          </div>
          <div className="rounded-2xl border border-line bg-white/70 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Mot-cle</p>
            <p className="mt-2 text-lg font-semibold">{product.primary_keyword}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white/75 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Angles emotionnels</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.emotional_angles.map((angle) => (
                <Badge key={angle}>{angle}</Badge>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-white/75 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Mots-cles secondaires</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.secondary_keywords.map((keyword) => (
                <Badge key={keyword}>{keyword}</Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <Card className="p-5">
          <h4 className="text-lg font-semibold">Dernier contenu</h4>
          {relatedContent[0] ? (
            <div className="mt-4 rounded-2xl border border-line bg-white/75 p-4">
              <p className="font-medium">{relatedContent[0].hook}</p>
              <p className="mt-2 text-sm text-muted">{relatedContent[0].body}</p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted">Aucun contenu genere pour ce produit.</p>
          )}
        </Card>

        <Card className="p-5">
          <h4 className="text-lg font-semibold">Version listing active</h4>
          {relatedListings[0] ? (
            <div className="mt-4 rounded-2xl border border-line bg-white/75 p-4">
              <p className="font-medium">{relatedListings[0].title}</p>
              <p className="mt-2 text-sm text-muted">
                Score {relatedListings[0].overall_score}
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted">Aucun listing optimise pour le moment.</p>
          )}
        </Card>

        <Card className="p-5">
          <h4 className="text-lg font-semibold">Brief visuel</h4>
          {relatedBriefs[0] ? (
            <div className="mt-4 rounded-2xl border border-line bg-white/75 p-4">
              <p className="font-medium">{relatedBriefs[0].primary_text}</p>
              <p className="mt-2 text-sm text-muted">
                {relatedBriefs[0].design_instructions}
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted">Aucun brief visuel pour ce produit.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
