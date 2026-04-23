import { getProductById, saveVisualBrief } from "@/lib/data/demo-store";
import { visualBriefPromptV1 } from "@/lib/prompts/visual-brief/v1";
import { GenerateVisualBriefInput, VisualBrief } from "@/lib/types";
import { fetchProductById, insertVisualBrief } from "@/lib/supabase/queries";
import { generateJsonObject } from "@/lib/openai/json";
import { hasOpenAI, hasSupabase } from "@/lib/services/runtime-service";

export async function generateVisualBrief(input: GenerateVisualBriefInput) {
  const product = hasSupabase()
    ? await fetchProductById(input.productId)
    : getProductById(input.productId);

  if (!product) {
    throw new Error("Produit introuvable.");
  }

  const aiResult = hasOpenAI()
    ? await generateJsonObject<{
        visual_type: "premium" | "emotion" | "gift" | "minimalist";
        primary_text: string;
        secondary_text: string;
        mood: string;
        composition: string;
        design_instructions: string;
      }>({
        developerPrompt: [
          `Role: ${visualBriefPromptV1.role}.`,
          `Sorties attendues: ${visualBriefPromptV1.outputs.join(", ")}.`,
          "Retourne uniquement un JSON avec visual_type, primary_text, secondary_text, mood, composition, design_instructions.",
          "Aucun angle medical.",
        ].join("\n"),
        userPrompt: [
          `Produit: ${product.name}`,
          `Pierre: ${product.main_stone}`,
          `Plateforme: ${input.platform}`,
          `Angle marketing: ${input.marketingAngle}`,
          `Keyword principal: ${product.primary_keyword}`,
        ].join("\n"),
      })
    : null;

  const item: VisualBrief = aiResult
    ? {
        id: crypto.randomUUID(),
        product_id: product.id,
        platform: input.platform,
        marketing_angle: input.marketingAngle,
        visual_type: aiResult.visual_type,
        primary_text: aiResult.primary_text,
        secondary_text: aiResult.secondary_text,
        mood: aiResult.mood,
        composition: aiResult.composition,
        design_instructions: aiResult.design_instructions,
        prompt_version: visualBriefPromptV1.version,
        created_at: new Date().toISOString(),
      }
    : {
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

  const saved = hasSupabase() ? await insertVisualBrief(item) : saveVisualBrief(item);

  return { product, brief: saved };
}
