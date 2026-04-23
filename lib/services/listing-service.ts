import { getProductById, saveListingVersion, demoListingVersions } from "@/lib/data/demo-store";
import { listingPromptV1 } from "@/lib/prompts/listing/v1";
import { ListingVersion, OptimizeListingInput } from "@/lib/types";
import { averageScore } from "@/lib/utils/scoring";
import { fetchListingVersions, fetchProductById, insertListingVersion } from "@/lib/supabase/queries";
import { generateJsonObject } from "@/lib/openai/json";
import { hasOpenAI, hasSupabase } from "@/lib/services/runtime-service";

export async function optimizeListing(input: OptimizeListingInput) {
  const product = hasSupabase()
    ? await fetchProductById(input.productId)
    : getProductById(input.productId);

  if (!product) {
    throw new Error("Produit introuvable.");
  }

  const keywords = input.keywords
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const seoScore = Math.min(99, 72 + keywords.length * 4);
  const conversionScore = input.marketingAngle ? 86 : 75;
  const complianceScore = input.listing.toLowerCase().includes("soin") ? 60 : 95;

  const aiResult = hasOpenAI()
    ? await generateJsonObject<{
        title: string;
        bullet_points: string[];
        description: string;
        backend_keywords: string[];
        seo_score: number;
        conversion_score: number;
        compliance_score: number;
      }>({
        developerPrompt: [
          `Role: ${listingPromptV1.role}.`,
          `Sorties attendues: ${listingPromptV1.outputs.join(", ")}.`,
          "Aucun claim medical.",
          "Retourne uniquement un JSON avec title, bullet_points, description, backend_keywords, seo_score, conversion_score, compliance_score.",
          "bullet_points doit contenir exactement 5 elements.",
        ].join("\n"),
        userPrompt: [
          `Produit: ${product.name}`,
          `Pierre: ${product.main_stone}`,
          `Keyword principal: ${product.primary_keyword}`,
          `Keywords: ${keywords.join(", ")}`,
          `Listing actuel: ${input.listing}`,
          `Angle marketing: ${input.marketingAngle}`,
        ].join("\n"),
      })
    : null;

  const item: ListingVersion = aiResult
    ? {
        id: crypto.randomUUID(),
        product_id: product.id,
        marketing_angle: input.marketingAngle,
        keyword_set: keywords,
        title: aiResult.title,
        bullet_points: aiResult.bullet_points.slice(0, 5),
        description: aiResult.description,
        backend_keywords: aiResult.backend_keywords.slice(0, 10),
        seo_score: Math.max(0, Math.min(100, Math.round(aiResult.seo_score))),
        conversion_score: Math.max(
          0,
          Math.min(100, Math.round(aiResult.conversion_score)),
        ),
        compliance_score: Math.max(
          0,
          Math.min(100, Math.round(aiResult.compliance_score)),
        ),
        overall_score: averageScore([
          aiResult.seo_score,
          aiResult.conversion_score,
          aiResult.compliance_score,
        ]),
        prompt_version: listingPromptV1.version,
        created_at: new Date().toISOString(),
      }
    : {
        id: crypto.randomUUID(),
        product_id: product.id,
        marketing_angle: input.marketingAngle,
        keyword_set: keywords,
        title: `Felicidade ${product.name}, ${product.main_stone}, Bijou ${input.marketingAngle || "Premium"}, Idee Cadeau`,
        bullet_points: [
          `Bijou ${product.brand} pense pour un rendu premium et rassurant.`,
          `Mise en avant de ${product.main_stone} avec un angle ${input.marketingAngle || "emotionnel"}.`,
          `Concu pour une page Amazon plus claire et plus orientee conversion.`,
          "Formulation sans promesse medicale ni sur-vente.",
          "Version prete a retravailler ou copier dans Seller Central.",
        ],
        description: `Cette version du listing positionne ${product.name} comme un bijou de pierre naturelle credible, vendeur et facile a comprendre, en mettant l accent sur ${input.marketingAngle || "une experience premium"}.`,
        backend_keywords: keywords.slice(0, 8),
        seo_score: seoScore,
        conversion_score: conversionScore,
        compliance_score: complianceScore,
        overall_score: averageScore([seoScore, conversionScore, complianceScore]),
        prompt_version: listingPromptV1.version,
        created_at: new Date().toISOString(),
      };

  const current = hasSupabase()
    ? await insertListingVersion(item)
    : saveListingVersion(item);

  const history = hasSupabase()
    ? await fetchListingVersions(product.id)
    : [current, ...demoListingVersions.filter((entry) => entry.product_id === product.id)];

  return {
    product,
    current,
    history: history.slice(0, 5),
  };
}
