"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ListingVersion, Product } from "@/lib/types";

export function ListingWorkbench() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ListingVersion | null>(null);
  const [form, setForm] = useState({
    productId: "",
    listing: "",
    keywords: "",
    marketingAngle: "premium emotionnel",
  });

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.items);
        if (data.items[0]) {
          setForm((current) => ({
            ...current,
            productId: current.productId || data.items[0].id,
          }));
        }
      });
  }, []);

  async function handleSubmit() {
    setLoading(true);
    const response = await fetch("/api/optimize-listing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    setResult(data.current);
    setLoading(false);
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      <Card className="p-6">
        <h4 className="text-lg font-semibold">Optimiser un listing Amazon</h4>
        <div className="mt-5 space-y-4">
          <label className="block text-sm text-muted">
            Produit
            <select
              className="mt-2 w-full rounded-2xl border border-line bg-white/80 px-4 py-3"
              value={form.productId}
              onChange={(event) =>
                setForm({ ...form, productId: event.target.value })
              }
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm text-muted">
            Listing actuel
            <textarea
              className="mt-2 min-h-32 w-full rounded-2xl border border-line bg-white/80 px-4 py-3"
              value={form.listing}
              onChange={(event) => setForm({ ...form, listing: event.target.value })}
              placeholder="Collez ici votre titre ou votre listing actuel"
            />
          </label>
          <label className="block text-sm text-muted">
            Mots-cles
            <input
              className="mt-2 w-full rounded-2xl border border-line bg-white/80 px-4 py-3"
              value={form.keywords}
              onChange={(event) => setForm({ ...form, keywords: event.target.value })}
              placeholder="mot cle 1, mot cle 2, mot cle 3"
            />
          </label>
          <label className="block text-sm text-muted">
            Angle marketing
            <input
              className="mt-2 w-full rounded-2xl border border-line bg-white/80 px-4 py-3"
              value={form.marketingAngle}
              onChange={(event) =>
                setForm({ ...form, marketingAngle: event.target.value })
              }
            />
          </label>
          <Button disabled={loading || !form.productId} onClick={handleSubmit}>
            {loading ? "Generation..." : "Optimiser listing"}
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="text-lg font-semibold">Version optimisee</h4>
        {result ? (
          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border border-line bg-white/75 p-4 text-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Scores</p>
              <p className="mt-2 text-muted">
                SEO {result.seo_score} · Conversion {result.conversion_score} ·
                Conformite {result.compliance_score}
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-white/75 p-4 text-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Titre</p>
              <p className="mt-2">{result.title}</p>
            </div>
            <div className="rounded-2xl border border-line bg-white/75 p-4 text-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Bullet points</p>
              <div className="mt-2 space-y-2 text-muted">
                {result.bullet_points.map((item) => (
                  <p key={item}>• {item}</p>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-white/75 p-4 text-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                Description et backend keywords
              </p>
              <p className="mt-2 text-muted">{result.description}</p>
              <p className="mt-3 text-clay">{result.backend_keywords.join(", ")}</p>
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-line p-6 text-sm text-muted">
            Lance une optimisation pour obtenir titre, bullets, description et backend keywords.
          </div>
        )}
      </Card>
    </div>
  );
}
