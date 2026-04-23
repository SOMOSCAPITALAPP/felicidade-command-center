"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product, VisualBrief } from "@/lib/types";

export function VisualsWorkbench() {
  const [products, setProducts] = useState<Product[]>([]);
  const [result, setResult] = useState<VisualBrief | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    productId: "",
    platform: "instagram",
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
    const response = await fetch("/api/generate-visual-brief", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    setResult(data.brief);
    setLoading(false);
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      <Card className="p-6">
        <h4 className="text-lg font-semibold">Brief visuel Canva</h4>
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
            Plateforme
            <select
              className="mt-2 w-full rounded-2xl border border-line bg-white/80 px-4 py-3"
              value={form.platform}
              onChange={(event) =>
                setForm({ ...form, platform: event.target.value as typeof form.platform })
              }
            >
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="tiktok">TikTok</option>
              <option value="x">X</option>
              <option value="pinterest">Pinterest</option>
            </select>
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
            {loading ? "Generation..." : "Generer brief"}
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="text-lg font-semibold">Resultat</h4>
        {result ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[
              ["Type de visuel", result.visual_type],
              ["Format vertical", result.orientation],
              ["Spec photo", result.photo_spec],
              ["Texte principal", result.primary_text],
              ["Texte secondaire", result.secondary_text],
              ["Ambiance", result.mood],
              ["Composition", result.composition],
              ["Instructions design", result.design_instructions],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-line bg-white/75 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted">{label}</p>
                <p className="mt-2 text-sm text-muted">{value}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-line p-6 text-sm text-muted">
            Lance une generation pour obtenir un brief Canva exploitable.
          </div>
        )}
      </Card>
    </div>
  );
}
