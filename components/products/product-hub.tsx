"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils/format";

const emptyForm = {
  name: "",
  asin: "",
  main_stone: "",
  price: "0",
  margin: "0",
  primary_keyword: "",
};

export function ProductHub() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadProducts() {
    setLoading(true);
    const response = await fetch("/api/products");
    const data = await response.json();
    setProducts(data.items);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        product_type: "bracelet",
        secondary_stones: [],
        audience: "femme",
        amazon_url: "",
        stock_status: "in_stock",
        bestseller_flag: false,
        seasonality: "evergreen",
        secondary_keywords: [],
        emotional_angles: [],
        notes: "",
        emotional_richness_score: 50,
        manual_priority: 50,
        price: Number(form.price),
        margin: Number(form.margin),
      }),
    });

    setForm(emptyForm);
    setSaving(false);
    await loadProducts();
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-line p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold">Catalogue produits</h4>
            <p className="mt-2 text-sm text-muted">
              Base centrale MVP pour lancer contenu, listing et briefs visuels.
            </p>
          </div>
          <Badge>{products.length} produits</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#f3ecdf] text-muted">
              <tr>
                <th className="px-5 py-4 font-medium">Produit</th>
                <th className="px-5 py-4 font-medium">ASIN</th>
                <th className="px-5 py-4 font-medium">Pierre</th>
                <th className="px-5 py-4 font-medium">Prix</th>
                <th className="px-5 py-4 font-medium">Marge</th>
                <th className="px-5 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-line">
                  <td className="px-5 py-4">
                    <div className="font-medium">{product.name}</div>
                    <div className="mt-1 text-xs text-muted">
                      {product.primary_keyword}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-muted">{product.asin}</td>
                  <td className="px-5 py-4">
                    <Badge>{product.main_stone}</Badge>
                  </td>
                  <td className="px-5 py-4 text-muted">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-5 py-4 text-muted">
                    {formatCurrency(product.margin)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/products/${product.id}`}>
                        <Button variant="ghost">Voir fiche</Button>
                      </Link>
                      <Link href={`/content?productId=${product.id}`}>
                        <Button variant="secondary">Generer</Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && products.length === 0 ? (
                <tr>
                  <td className="px-5 py-4 text-muted" colSpan={6}>
                    Aucun produit pour le moment.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="text-lg font-semibold">Ajout rapide produit</h4>
        <p className="mt-2 text-sm text-muted">
          Formulaire minimal pour avancer vite sans surcharger le workflow.
        </p>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm text-muted">
            Nom
            <input
              className="mt-2 w-full rounded-2xl border border-line bg-white/80 px-4 py-3"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              required
            />
          </label>
          <label className="block text-sm text-muted">
            ASIN
            <input
              className="mt-2 w-full rounded-2xl border border-line bg-white/80 px-4 py-3"
              value={form.asin}
              onChange={(event) => setForm({ ...form, asin: event.target.value })}
              required
            />
          </label>
          <label className="block text-sm text-muted">
            Pierre principale
            <input
              className="mt-2 w-full rounded-2xl border border-line bg-white/80 px-4 py-3"
              value={form.main_stone}
              onChange={(event) =>
                setForm({ ...form, main_stone: event.target.value })
              }
              required
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-muted">
              Prix
              <input
                type="number"
                step="0.01"
                className="mt-2 w-full rounded-2xl border border-line bg-white/80 px-4 py-3"
                value={form.price}
                onChange={(event) => setForm({ ...form, price: event.target.value })}
                required
              />
            </label>
            <label className="block text-sm text-muted">
              Marge
              <input
                type="number"
                step="0.01"
                className="mt-2 w-full rounded-2xl border border-line bg-white/80 px-4 py-3"
                value={form.margin}
                onChange={(event) => setForm({ ...form, margin: event.target.value })}
                required
              />
            </label>
          </div>
          <label className="block text-sm text-muted">
            Mot-cle principal
            <input
              className="mt-2 w-full rounded-2xl border border-line bg-white/80 px-4 py-3"
              value={form.primary_keyword}
              onChange={(event) =>
                setForm({ ...form, primary_keyword: event.target.value })
              }
              required
            />
          </label>
          <Button disabled={saving} type="submit">
            {saving ? "Enregistrement..." : "Ajouter produit"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
