import { getProductById, saveVisualBrief } from "@/lib/data/demo-store";
import { visualBriefPromptV1 } from "@/lib/prompts/visual-brief/v1";
import { GenerateVisualBriefInput, VisualBrief } from "@/lib/types";

export async function generateVisualBrief(input: GenerateVisualBriefInput) {
  const product = getProductById(input.productId);

  if (!product) {
    throw new Error("Produit introuvable.");
  }

  const item: VisualBrief = {
    id: crypto.randomUUID(),
    product_id: product.id,
    platform: input.platform,
    marketing_angle: input.marketingAngle,
    visual_type:
      input.marketingAngle.toLowerCase().includes("cadeau")
        ? "gift"
        : input.marketingAngle.toLowerCase().includes("emotion")
          ? "emotion"
          : "premium",
    primary_text: `${product.name} avec un angle ${input.marketingAngle}.`,
    secondary_text: `${product.main_stone} - ${product.brand} - ${product.primary_keyword}`,
    mood: "Lumiere douce, matieres premium, palette beige minerale et accents dores",
    composition:
      "Produit en gros plan, respiration visuelle importante et zone reservee pour texte",
    design_instructions:
      "Construire un visuel premium, emotionnel et credible, sans codes medicaux ni promesses exagerees.",
    prompt_version: visualBriefPromptV1.version,
    created_at: new Date().toISOString(),
  };

  saveVisualBrief(item);

  return { product, brief: item };
}
