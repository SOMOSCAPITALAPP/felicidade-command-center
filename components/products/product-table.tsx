import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Product = {
  id: string;
  name: string;
  asin: string;
  productType: string;
  mainStone: string;
  price: string;
  margin: string;
  stock: string;
  audience: string;
  keyword: string;
};

export function ProductTable({ products }: { products: Product[] }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-line p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold">Catalogue produits</h4>
          <p className="mt-2 text-sm text-muted">
            Vue principale pour filtrer, ouvrir une fiche et lancer une action.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">Filtrer</Button>
          <Button>Nouveau produit</Button>
        </div>
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
              <th className="px-5 py-4 font-medium">Stock</th>
              <th className="px-5 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-line">
                <td className="px-5 py-4">
                  <div className="font-medium">{product.name}</div>
                  <div className="mt-1 text-xs text-muted">
                    {product.productType} · {product.audience}
                  </div>
                </td>
                <td className="px-5 py-4 text-muted">{product.asin}</td>
                <td className="px-5 py-4">
                  <Badge>{product.mainStone}</Badge>
                </td>
                <td className="px-5 py-4 text-muted">{product.price}</td>
                <td className="px-5 py-4 text-muted">{product.margin}</td>
                <td className="px-5 py-4 text-muted">{product.stock}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/products/${product.id}`}>
                      <Button variant="ghost">Voir fiche</Button>
                    </Link>
                    <Link href="/content">
                      <Button variant="secondary">Generer</Button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
