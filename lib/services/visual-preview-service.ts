import { getProductById } from "@/lib/data/demo-store";
import { getOpenAIClient } from "@/lib/openai/client";
import { fetchProductById } from "@/lib/supabase/queries";
import { hasOpenAI, hasSupabase } from "@/lib/services/runtime-service";
import { GenerateVisualBriefInput, VisualPreview } from "@/lib/types";

function getImageSettings(platform: GenerateVisualBriefInput["platform"]) {
  if (platform === "tiktok") {
    return {
      size: "1024x1536",
      ratioLabel: "9:16 vertical",
    };
  }

  return {
    size: "1024x1536",
    ratioLabel: "4:5 vertical",
  };
}

export async function generateVisualPreview(input: {
  productId: string;
  platform: GenerateVisualBriefInput["platform"];
  marketingAngle: string;
  primaryText: string;
  secondaryText: string;
  mood: string;
  composition: string;
  designInstructions: string;
  photoSpec: string;
}): Promise<VisualPreview> {
  if (!hasOpenAI()) {
    throw new Error("OPENAI_API_KEY absente. Ajoute la cle API dans Vercel.");
  }

  const product = hasSupabase()
    ? await fetchProductById(input.productId)
    : getProductById(input.productId);

  if (!product) {
    throw new Error("Produit introuvable.");
  }

  const client = getOpenAIClient();

  if (!client) {
    throw new Error("Client OpenAI indisponible.");
  }

  const imageModel = process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-1-mini";
  const settings = getImageSettings(input.platform);

  const prompt = [
    "Create a realistic premium ecommerce product photo.",
    `Platform framing: ${settings.ratioLabel}.`,
    `Required photo spec: ${input.photoSpec}`,
    `Product: ${product.name}`,
    `Main stone: ${product.main_stone}`,
    `Marketing angle: ${input.marketingAngle}`,
    `Primary text inspiration: ${input.primaryText}`,
    `Secondary text inspiration: ${input.secondaryText}`,
    `Mood: ${input.mood}`,
    `Composition: ${input.composition}`,
    `Design instructions: ${input.designInstructions}`,
    "The image must be vertical, realistic, premium, editorial, and visually credible.",
    "No text overlay inside the image.",
    "No medical, mystical, or spammy visual codes.",
    "Focus on jewelry photography, elegant lighting, clean background, premium lifestyle styling.",
  ].join("\n");

  const response = await client.images.generate({
    model: imageModel,
    prompt,
    size: settings.size as "1024x1536",
    n: 1,
  });

  const base64 = response.data?.[0]?.b64_json;

  if (!base64) {
    throw new Error("OpenAI image n'a pas retourne d'image exploitable.");
  }

  return {
    image_data_url: `data:image/png;base64,${base64}`,
    image_model: imageModel,
    size: settings.size,
    generation_mode: "openai",
  };
}
