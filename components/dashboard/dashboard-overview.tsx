import Link from "next/link";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { demoContents } from "@/lib/data/demo-store";
import { getDailyPriorities } from "@/lib/services/priority-service";
import { listProducts } from "@/lib/services/products-service";
import { formatCurrency } from "@/lib/utils/format";

export function DashboardOverview() {
  const priorities = getDailyPriorities();
  const products = listProducts();

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 lg:grid-cols-3">
        {priorities.map((priority) => {
          const product = products.find((item) => item.id === priority.product_id);
          return (
            <Card key={priority.id} className="p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                Top {priority.rank_position}
              </p>
              <h4 className="mt-2 text-lg font-semibold">{product?.name}</h4>
              <p className="mt-2 text-sm text-clay">{priority.recommended_angle}</p>
              <p className="mt-3 text-sm text-muted">{priority.justification}</p>
              <p className="mt-3 text-sm text-muted">
                Score {priority.priority_score} · {priority.recommended_platform}
              </p>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold">Actions rapides</h4>
              <p className="mt-2 text-sm text-muted">
                Le chemin le plus court pour produire et publier.
              </p>
            </div>
            <Link href="/products">
              <Button variant="secondary">Voir produits</Button>
            </Link>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Link href="/content">
              <Card className="h-full p-4">
                <p className="font-medium">Generer contenu</p>
                <p className="mt-2 text-sm text-muted">Produire 1 a 10 variantes.</p>
              </Card>
            </Link>
            <Link href="/listings">
              <Card className="h-full p-4">
                <p className="font-medium">Optimiser listing</p>
                <p className="mt-2 text-sm text-muted">Titre, bullets, description.</p>
              </Card>
            </Link>
            <Link href="/visuals">
              <Card className="h-full p-4">
                <p className="font-medium">Brief Canva</p>
                <p className="mt-2 text-sm text-muted">Brief visuel actionnable.</p>
              </Card>
            </Link>
          </div>
        </Card>

        <Card className="p-5">
          <h4 className="text-lg font-semibold">Derniers contenus</h4>
          <div className="mt-4 space-y-3">
            {demoContents.slice(0, 3).map((item) => {
              const product = products.find((entry) => entry.id === item.product_id);
              return (
                <div key={item.id} className="rounded-2xl border border-line bg-white/70 p-4">
                  <p className="font-medium">{product?.name}</p>
                  <p className="mt-1 text-sm text-muted">
                    {item.platform} · {item.tone} · score {item.overall_score}
                  </p>
                  <p className="mt-2 text-sm text-muted">{item.hook}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h4 className="text-lg font-semibold">Catalogue prioritaire</h4>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="rounded-2xl border border-line bg-white/70 p-4">
              <p className="font-medium">{product.name}</p>
              <p className="mt-2 text-sm text-muted">
                {product.main_stone} · {formatCurrency(product.price)} · marge{" "}
                {formatCurrency(product.margin)}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
