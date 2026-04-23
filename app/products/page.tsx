import { AppShell } from "@/components/layout/app-shell";
import { ProductHub } from "@/components/products/product-hub";

export default function ProductsPage() {
  return (
    <AppShell
      title="Produits"
      description="Base produits centrale du MVP, concue pour ouvrir une fiche, filtrer vite et declencher le bon workflow sans friction."
    >
      <ProductHub />
    </AppShell>
  );
}
