import { getProductById, saveListingVersion, demoListingVersions } from "@/lib/data/demo-store";
import { listingPromptV1 } from "@/lib/prompts/listing/v1";
import { ListingVersion, OptimizeListingInput } from "@/lib/types";
import { averageScore } from "@/lib/utils/scoring";

export async function optimizeListing(input: OptimizeListingInput) {
  const product = getProductById(input.productId);

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

  const item: ListingVersion = {
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

  saveListingVersion(item);

  return {
    product,
    current: item,
    history: [item, ...demoListingVersions.filter((entry) => entry.product_id === product.id)].slice(0, 5),
  };
}
