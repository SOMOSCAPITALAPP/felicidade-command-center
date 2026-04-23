import { demoProducts, getProductById, upsertProduct } from "@/lib/data/demo-store";
import { Product } from "@/lib/types";

export function listProducts() {
  return demoProducts;
}

export function getProduct(productId: string) {
  return getProductById(productId);
}

export function createOrUpdateProduct(input: Partial<Product>) {
  const product: Product = {
    id: input.id ?? crypto.randomUUID(),
    name: input.name ?? "Nouveau produit Felicidade",
    asin: input.asin ?? `ASIN-${Date.now()}`,
    brand: input.brand ?? "Felicidade",
    product_type: input.product_type ?? "bracelet",
    main_stone: input.main_stone ?? "Pierre naturelle",
    secondary_stones: input.secondary_stones ?? [],
    bead_size_mm: input.bead_size_mm ?? 8,
    audience: input.audience ?? "femme",
    price: input.price ?? 0,
    margin: input.margin ?? 0,
    amazon_url: input.amazon_url ?? "",
    stock_status: input.stock_status ?? "in_stock",
    bestseller_flag: input.bestseller_flag ?? false,
    seasonality: input.seasonality ?? "evergreen",
    primary_keyword: input.primary_keyword ?? "",
    secondary_keywords: input.secondary_keywords ?? [],
    emotional_angles: input.emotional_angles ?? [],
    notes: input.notes ?? "",
    emotional_richness_score: input.emotional_richness_score ?? 50,
    manual_priority: input.manual_priority ?? 50,
    created_at: input.created_at ?? new Date().toISOString(),
  };

  return upsertProduct(product);
}
