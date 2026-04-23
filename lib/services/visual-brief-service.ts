import { getProductById, saveVisualBrief } from "@/lib/data/demo-store";
import { visualBriefPromptV1 } from "@/lib/prompts/visual-brief/v1";
import { GenerateVisualBriefInput, VisualBrief } from "@/lib/types";
import { fetchProductById, insertVisualBrief } from "@/lib/supabase/queries";
import { generateJsonObject } from "@/lib/openai/json";
import { hasOpenAI, hasSupabase } from "@/lib/services/runtime-service";

function getVerticalFormat(platform: GenerateVisualBriefInput["platform"]) {
  if (platform === "tiktok") {
    return {
      orientation: "9:16 vertical",
      photoSpec:
        "Photo verticale realiste 9:16, type lifestyle premium, pensee pour reel ou TikTok.",
    };
  }

  if (platform === "instagram") {
    return {
      orientation: "4:5 vertical",
      photoSpec:
        "Photo verticale realiste 4:5, type editorial premium, adaptee au feed Instagram.",
    };
  }

  return {
    orientation: "4:5 vertical",
    photoSpec:
      "Photo verticale realiste 4:5, cadrage lifestyle premium, utilisable sur reseaux sociaux.",
  };
}

export async function generateVisualBrief(input: GenerateVisualBriefInput) {
  const product = hasSupabase()
    ? await fetchProductById(input.productId)
    : getProductById(input.productId);

  if (!product) {
    throw new Error("Produit introuvable.");
  }

  const format = getVerticalFormat(input.platform);

  const aiResult = hasOpenAI()
    ? await generateJsonObject<{
        visual_type: "premium" | "emotion" | "gift" | "minimalist";
        orientation: string;
        photo_spec: string;
        primary_text: string;
        secondary_text: string;
        mood: string;
        composition: string;
        design_instructions: string;
      }>({
        developerPrompt: [
          `Role: ${visualBriefPromptV1.role}.`,
          `Sorties attendues: ${visualBriefPromptV1.outputs.join(", ")}.`,
          "Retourne uniquement un JSON avec visual_type, orientation, photo_spec, primary_text, secondary_text, mood, composition, design_instructions.",
          "Le visuel doit etre une photo verticale realiste, pas un simple mockup texte.",
          "Respecte strictement un format vertical adapte a la plateforme.",
          "Aucun angle medical.",
        ].join("\n"),
        userPrompt: [
          `Produit: ${product.name}`,
          `Pierre: ${product.main_stone}`,
          `Plateforme: ${input.platform}`,
          `Format impose: ${format.orientation}`,
          `Spec photo imposee: ${format.photoSpec}`,
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
        orientation: aiResult.orientation,
        photo_spec: aiResult.photo_spec,
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
        orientation: format.orientation,
        photo_spec: format.photoSpec,
        primary_text: `${product.name} avec un angle ${input.marketingAngle}.`,
        secondary_text: `${product.main_stone} - ${product.brand} - ${product.primary_keyword}`,
        mood: "Lumiere douce, matieres premium, palette beige minerale et accents dores",
        composition:
          `Photo verticale ${format.orientation} avec produit en gros plan, respiration visuelle importante et zone reservee pour texte`,
        design_instructions:
          `Construire une photo verticale realiste ${format.orientation}, premium, emotionnelle et credible, sans codes medicaux ni promesses exagerees.`,
        prompt_version: visualBriefPromptV1.version,
        created_at: new Date().toISOString(),
      };

  const saved = hasSupabase() ? await insertVisualBrief(item) : saveVisualBrief(item);

  return { product, brief: saved };
}
