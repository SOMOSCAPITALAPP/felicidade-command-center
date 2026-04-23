"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GeneratedContent, Product } from "@/lib/types";

type Result = {
  variants: GeneratedContent[];
};

export function ContentWorkbench({
  initialProductId,
}: {
  initialProductId?: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generationMode, setGenerationMode] = useState<string | null>(null);
  const [form, setForm] = useState({
    productId: initialProductId ?? "",
    platform: "instagram",
    tone: "emotionnel",
    objective: "achat",
    length: "court",
    variantCount: 4,
  });

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.items);
        if (data.items[0]) {
          setForm((current) => ({
            ...current,
            productId: current.productId || initialProductId || data.items[0].id,
          }));
        }
      });
  }, [initialProductId]);

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === form.productId) ?? null,
    [form.productId, products],
  );

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    const response = await fetch("/api/generate-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (!response.ok) {
      setResult(null);
      setGenerationMode(null);
      setError(data.error ?? "Erreur generation contenu");
      setLoading(false);
      return;
    }

    setGenerationMode(data.generationMode ?? null);
    setResult({ variants: data.variants ?? [] });
    setLoading(false);
  }

  async function sendToQueue(variantId: string) {
    const scheduledAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    await fetch("/api/publishing-queue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: form.productId,
        generatedContentId: variantId,
        scheduledAt,
      }),
    });
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      <Card className="p-6">
        <h4 className="text-lg font-semibold">Generation multi-plateforme</h4>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="text-sm text-muted">
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
          <label className="text-sm text-muted">
            Plateforme
            <select
              className="mt-2 w-full rounded-2xl border border-line bg-white/80 px-4 py-3"
              value={form.platform}
              onChange={(event) =>
                setForm({ ...form, platform: event.target.value as typeof form.platform })
              }
            >
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="x">X</option>
              <option value="pinterest">Pinterest</option>
            </select>
          </label>
          <label className="text-sm text-muted">
            Ton
            <select
              className="mt-2 w-full rounded-2xl border border-line bg-white/80 px-4 py-3"
              value={form.tone}
              onChange={(event) =>
                setForm({ ...form, tone: event.target.value as typeof form.tone })
              }
            >
              <option value="emotionnel">Emotionnel</option>
              <option value="premium">Premium</option>
              <option value="cadeau">Cadeau</option>
              <option value="spirituel">Spirituel</option>
              <option value="luxe">Luxe</option>
              <option value="minimaliste">Minimaliste</option>
            </select>
          </label>
          <label className="text-sm text-muted">
            Objectif
            <select
              className="mt-2 w-full rounded-2xl border border-line bg-white/80 px-4 py-3"
              value={form.objective}
              onChange={(event) =>
                setForm({
                  ...form,
                  objective: event.target.value as typeof form.objective,
                })
              }
            >
              <option value="achat">Achat</option>
              <option value="clic">Clic</option>
              <option value="engagement">Engagement</option>
            </select>
          </label>
          <label className="text-sm text-muted">
            Longueur
            <select
              className="mt-2 w-full rounded-2xl border border-line bg-white/80 px-4 py-3"
              value={form.length}
              onChange={(event) =>
                setForm({ ...form, length: event.target.value as typeof form.length })
              }
            >
              <option value="court">Court</option>
              <option value="moyen">Moyen</option>
              <option value="long">Long</option>
            </select>
          </label>
          <label className="text-sm text-muted">
            Variantes
            <input
              type="number"
              min={1}
              max={10}
              className="mt-2 w-full rounded-2xl border border-line bg-white/80 px-4 py-3"
              value={form.variantCount}
              onChange={(event) =>
                setForm({ ...form, variantCount: Number(event.target.value) })
              }
            />
          </label>
        </div>
        <div className="mt-5 rounded-2xl border border-line bg-white/70 p-4 text-sm text-muted">
          {selectedProduct
            ? `Produit actif : ${selectedProduct.name} · ${selectedProduct.primary_keyword}`
            : "Selectionnez un produit."}
        </div>
        <div className="mt-5 flex gap-3">
          <Button disabled={loading || !form.productId} onClick={handleGenerate}>
            {loading ? "Generation..." : "Generer contenu"}
          </Button>
        </div>
        {generationMode ? (
          <div className="mt-4 rounded-2xl border border-line bg-white/70 p-4 text-sm text-muted">
            Mode actif : {generationMode}
          </div>
        ) : null}
        {error ? (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        ) : null}
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Variantes generees</h4>
          <div className="text-sm text-muted">
            {result?.variants.length ?? 0} sortie(s)
          </div>
        </div>
        <div className="mt-5 space-y-4">
          {result?.variants.map((variant) => (
            <div key={variant.id} className="rounded-2xl border border-line bg-white/75 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                {variant.variant_label} · score {variant.overall_score}
              </p>
              <p className="mt-2 font-medium">{variant.hook}</p>
              <p className="mt-3 text-sm leading-6 text-muted">{variant.body}</p>
              <p className="mt-3 text-sm text-clay">
                {variant.hashtags.join(" ")} · {variant.call_to_action}
              </p>
              <div className="mt-4 flex gap-3">
                <Button
                  variant="secondary"
                  onClick={() => navigator.clipboard.writeText(variant.body)}
                >
                  Copier
                </Button>
                <Button variant="ghost" onClick={() => sendToQueue(variant.id)}>
                  Envoyer en queue
                </Button>
              </div>
            </div>
          ))}
          {!result ? (
            <div className="rounded-2xl border border-dashed border-line p-6 text-sm text-muted">
              Lance une generation pour afficher des hooks, textes, hashtags et CTA.
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
