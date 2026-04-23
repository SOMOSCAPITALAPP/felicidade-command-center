import { anglesPromptV1 } from "@/lib/prompts/angles/v1";
import { getProductById, replaceAngles, demoAngles } from "@/lib/data/demo-store";
import { MarketingAngle } from "@/lib/types";

const emotionPool = [
  "reassurance",
  "tendresse",
  "confiance",
  "elegance",
  "gratitude",
  "ancrage",
  "serenite",
  "fierte",
  "raffinement",
  "douceur",
  "presence",
  "chaleur",
];

export async function generateAngles(productId: string) {
  const product = getProductById(productId);

  if (!product) {
    throw new Error("Produit introuvable.");
  }

  const items: MarketingAngle[] = Array.from({ length: 12 }).map((_, index) => ({
    id: crypto.randomUUID(),
    product_id: product.id,
    angle_name: `${product.main_stone} angle ${index + 1}`,
    dominant_emotion: emotionPool[index],
    symbolic_promise: `Une facon elegante de porter ${emotionPool[index]} au quotidien.`,
    target_customer:
      product.audience === "mixte"
        ? "Client sensible au style symbolique"
        : "Femme cherchant un bijou porteur de sens",
    short_hook: `${product.name}, pour exprimer ${emotionPool[index]}.`,
    recommended_usage: index % 3 === 0 ? "amazon" : index % 2 === 0 ? "ad" : "post",
    created_at: new Date().toISOString(),
  }));

  replaceAngles(product.id, items);

  return {
    product,
    angles: items,
    promptVersion: anglesPromptV1.version,
    history: demoAngles.filter((item) => item.product_id === product.id),
  };
}
