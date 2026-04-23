export function averageScore(scores: number[]) {
  return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
}

export function calculatePriorityScore(input: {
  margin: number;
  stockStatus: "in_stock" | "low_stock" | "out_of_stock";
  bestsellerFlag: boolean;
  seasonality: string;
  emotionalRichnessScore: number;
  manualPriority: number;
}) {
  const stockScore =
    input.stockStatus === "in_stock"
      ? 100
      : input.stockStatus === "low_stock"
        ? 60
        : 10;
  const bestsellerScore = input.bestsellerFlag ? 100 : 40;
  const seasonalityScore = ["mothers_day", "valentines_day", "holiday"].includes(
    input.seasonality,
  )
    ? 90
    : ["gift", "winter", "summer"].includes(input.seasonality)
      ? 70
      : 50;
  const marginScore = Math.max(0, Math.min(100, Math.round(input.margin * 2)));

  return Math.max(
    0,
    Math.min(
      100,
      Math.round(
        marginScore * 0.25 +
          stockScore * 0.15 +
          bestsellerScore * 0.15 +
          seasonalityScore * 0.1 +
          input.emotionalRichnessScore * 0.2 +
          input.manualPriority * 0.15,
      ),
    ),
  );
}
