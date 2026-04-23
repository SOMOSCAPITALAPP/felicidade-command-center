import { buildDailyPriorities } from "@/lib/data/demo-store";
import { fetchDailyPriorities, fetchProducts, refreshDailyPriorities } from "@/lib/supabase/queries";
import { hasSupabase } from "@/lib/services/runtime-service";
import { calculatePriorityScore } from "@/lib/utils/scoring";

export async function getDailyPriorities() {
  if (hasSupabase()) {
    const existing = await fetchDailyPriorities();

    if (existing.length > 0) {
      return existing;
    }

    const products = await fetchProducts();
    const rows = products
      .map((product) => ({
        product_id: product.id,
        priority_score: calculatePriorityScore({
          margin: product.margin,
          stockStatus: product.stock_status,
          bestsellerFlag: product.bestseller_flag,
          seasonality: product.seasonality,
          emotionalRichnessScore: product.emotional_richness_score,
          manualPriority: product.manual_priority,
        }),
        recommended_angle: product.emotional_angles[0] ?? "angle premium",
        recommended_platform: product.bestseller_flag ? "instagram" : "facebook",
        justification: `${product.name} combine marge, potentiel narratif et action marketing immediate.`,
        rank_position: 0,
      }))
      .sort((a, b) => b.priority_score - a.priority_score)
      .slice(0, 3)
      .map((item, index) => ({
        ...item,
        rank_position: index + 1,
      }));

    return refreshDailyPriorities(rows);
  }

  return buildDailyPriorities();
}
