import { contentPromptV1 } from "@/lib/prompts/content/v1";
import { demoContents, getProductById, saveGeneratedContents } from "@/lib/data/demo-store";
import { GenerateContentInput, GeneratedContent } from "@/lib/types";
import { averageScore } from "@/lib/utils/scoring";

const angleByTone: Record<GenerateContentInput["tone"], string> = {
  emotionnel: "une presence douce et porteuse de sens",
  premium: "une allure chic et precise",
  cadeau: "une attention memorable a offrir",
  spirituel: "un rituel symbolique et inspirant",
  luxe: "un style rare et raffine",
  minimaliste: "une elegance simple et nette",
};

export async function generateContent(input: GenerateContentInput) {
  const product = getProductById(input.productId);

  if (!product) {
    throw new Error("Produit introuvable.");
  }

  const variants: GeneratedContent[] = Array.from({ length: input.variantCount }).map(
    (_, index) => {
      const emotionScore = Math.min(99, 78 + index * 2 + (input.tone === "emotionnel" ? 10 : 4));
      const conversionScore = Math.min(99, 74 + index * 2 + (input.objective === "achat" ? 8 : 3));
      const readabilityScore = Math.min(99, 80 + (input.length === "court" ? 8 : 3));

      return {
        id: crypto.randomUUID(),
        product_id: product.id,
        platform: input.platform,
        tone: input.tone,
        objective: input.objective,
        length: input.length,
        variant_label: ["emotionnelle", "premium", "cadeau", "directe conversion"][index] ?? `variante ${index + 1}`,
        hook: `${product.name} : ${angleByTone[input.tone]}.`,
        body: `Pour ${input.platform}, mettez en avant ${product.name} comme ${angleByTone[input.tone]}. Ce bijou en ${product.main_stone} valorise un style ${input.tone} et reste credible pour un usage quotidien, sans promesse medicale.`,
        hashtags: [
          "#felicidade",
          `#${product.main_stone.toLowerCase().replaceAll(" ", "")}`,
          "#bijoupremium",
        ],
        call_to_action:
          input.objective === "achat"
            ? "Decouvrir sur Amazon"
            : input.objective === "clic"
              ? "Voir le produit"
              : "Dites-nous votre version preferee",
        emotion_score: emotionScore,
        conversion_score: conversionScore,
        readability_score: readabilityScore,
        overall_score: averageScore([emotionScore, conversionScore, readabilityScore]),
        prompt_version: contentPromptV1.version,
        created_at: new Date().toISOString(),
      };
    },
  );

  saveGeneratedContents(variants);

  return {
    product,
    variants,
    latest: [variants[0], ...demoContents].slice(0, 6),
  };
}
