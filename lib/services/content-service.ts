import { contentPromptV1 } from "@/lib/prompts/content/v1";
import { demoContents, getProductById, saveGeneratedContents } from "@/lib/data/demo-store";
import { GenerateContentInput, GeneratedContent } from "@/lib/types";
import { averageScore } from "@/lib/utils/scoring";
import { generateJsonObject } from "@/lib/openai/json";
import {
  fetchGeneratedContent,
  fetchProductById,
  insertGeneratedContents,
} from "@/lib/supabase/queries";
import { hasOpenAI, hasSupabase } from "@/lib/services/runtime-service";

const angleByTone: Record<GenerateContentInput["tone"], string> = {
  emotionnel: "une presence douce et porteuse de sens",
  premium: "une allure chic et precise",
  cadeau: "une attention memorable a offrir",
  spirituel: "un rituel symbolique et inspirant",
  luxe: "un style rare et raffine",
  minimaliste: "une elegance simple et nette",
};

export async function generateContent(input: GenerateContentInput) {
  const product = hasSupabase()
    ? await fetchProductById(input.productId)
    : getProductById(input.productId);

  if (!product) {
    throw new Error("Produit introuvable.");
  }

  const aiResult = hasOpenAI()
    ? await generateJsonObject<{
        variants: Array<{
          variant_label: string;
          hook: string;
          body: string;
          hashtags: string[];
          call_to_action: string;
          emotion_score: number;
          conversion_score: number;
          readability_score: number;
        }>;
      }>({
        developerPrompt: [
          `Role: ${contentPromptV1.role}.`,
          ...contentPromptV1.constraints.map((item) => `Contrainte: ${item}.`),
          "Retourne un objet JSON avec la cle variants.",
          "Chaque variante doit contenir: variant_label, hook, body, hashtags, call_to_action, emotion_score, conversion_score, readability_score.",
          "Les scores sont des entiers entre 0 et 100.",
        ].join("\n"),
        userPrompt: [
          `Produit: ${product.name}`,
          `Pierre principale: ${product.main_stone}`,
          `Audience: ${product.audience}`,
          `Mot-cle principal: ${product.primary_keyword}`,
          `Plateforme: ${input.platform}`,
          `Ton: ${input.tone}`,
          `Objectif: ${input.objective}`,
          `Longueur: ${input.length}`,
          `Nombre de variantes: ${input.variantCount}`,
        ].join("\n"),
        temperature: 0.8,
      })
    : null;

  const variants: GeneratedContent[] = (aiResult?.variants?.length
    ? aiResult.variants.slice(0, input.variantCount).map((item) => ({
        id: crypto.randomUUID(),
        product_id: product.id,
        platform: input.platform,
        tone: input.tone,
        objective: input.objective,
        length: input.length,
        variant_label: item.variant_label,
        hook: item.hook,
        body: item.body,
        hashtags: item.hashtags,
        call_to_action: item.call_to_action,
        emotion_score: Math.max(0, Math.min(100, Math.round(item.emotion_score))),
        conversion_score: Math.max(
          0,
          Math.min(100, Math.round(item.conversion_score)),
        ),
        readability_score: Math.max(
          0,
          Math.min(100, Math.round(item.readability_score)),
        ),
        overall_score: averageScore([
          item.emotion_score,
          item.conversion_score,
          item.readability_score,
        ]),
        prompt_version: contentPromptV1.version,
        created_at: new Date().toISOString(),
      }))
    : Array.from({ length: input.variantCount }).map((_, index) => {
        const emotionScore = Math.min(
          99,
          78 + index * 2 + (input.tone === "emotionnel" ? 10 : 4),
        );
        const conversionScore = Math.min(
          99,
          74 + index * 2 + (input.objective === "achat" ? 8 : 3),
        );
        const readabilityScore = Math.min(
          99,
          80 + (input.length === "court" ? 8 : 3),
        );

        return {
          id: crypto.randomUUID(),
          product_id: product.id,
          platform: input.platform,
          tone: input.tone,
          objective: input.objective,
          length: input.length,
          variant_label:
            ["emotionnelle", "premium", "cadeau", "directe conversion"][index] ??
            `variante ${index + 1}`,
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
          overall_score: averageScore([
            emotionScore,
            conversionScore,
            readabilityScore,
          ]),
          prompt_version: contentPromptV1.version,
          created_at: new Date().toISOString(),
        };
      })) as GeneratedContent[];

  const savedVariants = hasSupabase()
    ? await insertGeneratedContents(variants)
    : saveGeneratedContents(variants);

  const latest = hasSupabase()
    ? await fetchGeneratedContent(product.id)
    : [savedVariants[0], ...demoContents].slice(0, 6);

  return {
    generationMode: aiResult?.variants?.length ? "openai" : "demo",
    product,
    variants: savedVariants,
    latest: latest.slice(0, 6),
  };
}
