import { AppShell } from "@/components/layout/app-shell";
import { ProductDetailView } from "@/components/products/product-detail-view";
import { getProduct } from "@/lib/services/products-service";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <AppShell
      title="Fiche produit"
      description="Vue detaillee d un produit pour centraliser les informations utiles, les angles et les actions immediate du quotidien."
    >
      <ProductDetailView product={product} />
    </AppShell>
  );
}
