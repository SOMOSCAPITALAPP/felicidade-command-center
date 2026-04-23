"use client";

import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MarketingAngle, Product } from "@/lib/types";

export function AnglesWorkbench() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(false);
  const [angles, setAngles] = useState<MarketingAngle[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.items);
        if (data.items[0]) {
          setProductId(data.items[0].id);
        }
      });
  }, []);

  async function handleGenerate() {
    setLoading(true);
    const response = await fetch("/api/generate-angles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    const data = await response.json();
    setAngles(data.angles ?? []);
    setLoading(false);
  }

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <label className="flex-1 text-sm text-muted">
            Produit
            <select
              className="mt-2 w-full rounded-2xl border border-line bg-white/80 px-4 py-3"
              value={productId}
              onChange={(event) => setProductId(event.target.value)}
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </label>
          <Button disabled={loading || !productId} onClick={handleGenerate}>
            {loading ? "Generation..." : "Generer 12 angles"}
          </Button>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {angles.map((angle) => (
          <Card key={angle.id} className="p-5">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">{angle.angle_name}</h4>
              <Badge>{angle.recommended_usage}</Badge>
            </div>
            <p className="mt-3 text-sm font-medium text-clay">
              {angle.dominant_emotion}
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">
              {angle.symbolic_promise}
            </p>
            <p className="mt-3 text-sm text-muted">{angle.target_customer}</p>
            <p className="mt-3 text-sm font-medium">{angle.short_hook}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
