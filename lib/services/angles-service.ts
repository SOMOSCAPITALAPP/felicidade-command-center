import { anglesPromptV1 } from "@/lib/prompts/angles/v1";
import { getProductById, replaceAngles, demoAngles } from "@/lib/data/demo-store";
import { MarketingAngle } from "@/lib/types";
import { fetchMarketingAngles, fetchProductById, replaceMarketingAngles } from "@/lib/supabase/queries";
import { generateJsonObject } from "@/lib/openai/json";
import { hasOpenAI, hasSupabase } from "@/lib/services/runtime-service";

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
  const product = hasSupabase()
    ? await fetchProductById(productId)
    : getProductById(productId);

  if (!product) {
    throw new Error("Produit introuvable.");
  }

  const aiResult = hasOpenAI()
    ? await generateJsonObject<{
        angles: Array<{
          angle_name: string;
          dominant_emotion: string;
          symbolic_promise: string;
          target_customer: string;
          short_hook: string;
          recommended_usage: "post" | "ad" | "amazon";
        }>;
      }>({
        developerPrompt: [
          `Role: ${anglesPromptV1.role}.`,
          `Sorties attendues: ${anglesPromptV1.outputs.join(", ")}.`,
          "Retourne un JSON avec la cle angles contenant exactement 12 objets.",
          "Aucune promesse medicale.",
        ].join("\n"),
        userPrompt: [
          `Produit: ${product.name}`,
          `Pierre: ${product.main_stone}`,
          `Audience: ${product.audience}`,
          `Mot-cle principal: ${product.primary_keyword}`,
          `Angles existants: ${product.emotional_angles.join(", ")}`,
        ].join("\n"),
      })
    : null;

  const items: MarketingAngle[] = aiResult?.angles?.length
    ? aiResult.angles.slice(0, 12).map((angle) => ({
        id: crypto.randomUUID(),
        product_id: product.id,
        angle_name: angle.angle_name,
        dominant_emotion: angle.dominant_emotion,
        symbolic_promise: angle.symbolic_promise,
        target_customer: angle.target_customer,
        short_hook: angle.short_hook,
        recommended_usage: angle.recommended_usage,
        created_at: new Date().toISOString(),
      }))
    : Array.from({ length: 12 }).map((_, index) => ({
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
        recommended_usage:
          index % 3 === 0 ? "amazon" : index % 2 === 0 ? "ad" : "post",
        created_at: new Date().toISOString(),
      }));

  const saved = hasSupabase()
    ? await replaceMarketingAngles(product.id, items)
    : replaceAngles(product.id, items);

  const history = hasSupabase()
    ? await fetchMarketingAngles(product.id)
    : demoAngles.filter((item) => item.product_id === product.id);

  return {
    product,
    angles: saved,
    promptVersion: anglesPromptV1.version,
    history,
  };
}
