import {
  DailyPriority,
  GeneratedContent,
  ListingVersion,
  MarketingAngle,
  Platform,
  Product,
  QueueItem,
  VisualBrief,
} from "@/lib/types";
import { averageScore, calculatePriorityScore } from "@/lib/utils/scoring";

const now = new Date("2026-04-23T10:00:00.000Z").toISOString();

export const demoProducts: Product[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    name: "Bracelet Apaisement Labradorite",
    asin: "B0FELI001",
    brand: "Felicidade",
    product_type: "bracelet",
    main_stone: "Labradorite",
    secondary_stones: ["Hematite"],
    bead_size_mm: 8,
    audience: "femme",
    price: 39.9,
    margin: 22,
    amazon_url: "https://www.amazon.fr/dp/B0FELI001",
    stock_status: "in_stock",
    bestseller_flag: true,
    seasonality: "evergreen",
    primary_keyword: "bracelet pierre naturelle femme",
    secondary_keywords: [
      "bracelet labradorite",
      "bijou energie symbolique",
      "cadeau femme raffine",
    ],
    emotional_angles: [
      "protection elegante",
      "rituel quotidien",
      "cadeau porteur de sens",
    ],
    notes: "Produit hero pour acquisition.",
    emotional_richness_score: 88,
    manual_priority: 92,
    created_at: now,
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    name: "Bracelet Amour Quartz Rose",
    asin: "B0FELI002",
    brand: "Felicidade",
    product_type: "bracelet",
    main_stone: "Quartz Rose",
    secondary_stones: ["Howlite"],
    bead_size_mm: 6,
    audience: "femme",
    price: 34.9,
    margin: 19,
    amazon_url: "https://www.amazon.fr/dp/B0FELI002",
    stock_status: "in_stock",
    bestseller_flag: false,
    seasonality: "gift",
    primary_keyword: "bracelet quartz rose femme",
    secondary_keywords: ["bracelet amour", "bijou pierre rose", "idee cadeau femme"],
    emotional_angles: ["tendresse moderne", "cadeau coeur", "douceur premium"],
    notes: "Excellent potentiel cadeau.",
    emotional_richness_score: 93,
    manual_priority: 85,
    created_at: now,
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    name: "Bracelet Protection Oeil de Tigre",
    asin: "B0FELI003",
    brand: "Felicidade",
    product_type: "bracelet",
    main_stone: "Oeil de Tigre",
    secondary_stones: ["Onyx Noir"],
    bead_size_mm: 8,
    audience: "mixte",
    price: 42.9,
    margin: 24,
    amazon_url: "https://www.amazon.fr/dp/B0FELI003",
    stock_status: "low_stock",
    bestseller_flag: true,
    seasonality: "evergreen",
    primary_keyword: "bracelet oeil de tigre",
    secondary_keywords: [
      "bracelet homme pierre naturelle",
      "bracelet protection symbolique",
      "bijou mixte premium",
    ],
    emotional_angles: ["force calme", "confiance quotidienne", "presence affirmee"],
    notes: "Bonne conversion, stock a surveiller.",
    emotional_richness_score: 84,
    manual_priority: 78,
    created_at: now,
  },
];

export let demoContents: GeneratedContent[] = [];
export let demoListingVersions: ListingVersion[] = [];
export let demoAngles: MarketingAngle[] = [];
export let demoVisualBriefs: VisualBrief[] = [];
export let demoQueue: QueueItem[] = [];

export function getProductById(productId: string) {
  return demoProducts.find((product) => product.id === productId) ?? null;
}

export function upsertProduct(product: Product) {
  const index = demoProducts.findIndex((item) => item.id === product.id);
  if (index === -1) {
    demoProducts.unshift(product);
  } else {
    demoProducts[index] = product;
  }
  return product;
}

export function saveGeneratedContents(items: GeneratedContent[]) {
  demoContents = [...items, ...demoContents];
  return items;
}

export function saveListingVersion(item: ListingVersion) {
  demoListingVersions = [item, ...demoListingVersions.filter((entry) => entry.id !== item.id)];
  return item;
}

export function saveAngles(items: MarketingAngle[]) {
  demoAngles = [...items.filter((item) => item.product_id !== items[0]?.product_id), ...demoAngles];
  return items;
}

export function replaceAngles(productId: string, items: MarketingAngle[]) {
  demoAngles = [...demoAngles.filter((item) => item.product_id !== productId), ...items];
  return items;
}

export function saveVisualBrief(item: VisualBrief) {
  demoVisualBriefs = [item, ...demoVisualBriefs.filter((entry) => entry.id !== item.id)];
  return item;
}

export function saveQueueItem(item: QueueItem) {
  demoQueue = [item, ...demoQueue.filter((entry) => entry.id !== item.id)];
  return item;
}

export function buildDailyPriorities(): DailyPriority[] {
  return demoProducts
    .map((product): Omit<DailyPriority, "rank_position"> => ({
      id: `${product.id}-priority`,
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
      recommended_platform: (product.bestseller_flag
        ? "instagram"
        : "facebook") as Platform,
      justification: `${product.name} combine marge, potentiel narratif et action marketing immediate.`,
    }))
    .sort((a, b) => b.priority_score - a.priority_score)
    .slice(0, 3)
    .map((item, index) => ({
      ...item,
      rank_position: index + 1,
    }));
}

export function seedDemoMvpData() {
  if (demoContents.length === 0) {
    demoContents = [
      {
        id: "content-seed-1",
        product_id: demoProducts[0].id,
        platform: "instagram",
        tone: "emotionnel",
        objective: "achat",
        length: "court",
        variant_label: "emotionnelle",
        hook: "Et si votre bijou racontait enfin quelque chose de vous ?",
        body: "Le bracelet Labradorite accompagne vos looks avec une allure douce, lumineuse et pleine de sens.",
        hashtags: ["#braceletpierresnaturelles", "#bijoufemme", "#labradorite"],
        call_to_action: "Decouvrir sur Amazon",
        emotion_score: 90,
        conversion_score: 82,
        readability_score: 88,
        overall_score: averageScore([90, 82, 88]),
        prompt_version: "content_v1",
        created_at: now,
      },
    ];
  }

  if (demoListingVersions.length === 0) {
    demoListingVersions = [
      {
        id: "listing-seed-1",
        product_id: demoProducts[0].id,
        marketing_angle: "protection elegante",
        keyword_set: ["bracelet pierre naturelle femme", "bracelet labradorite"],
        title:
          "Felicidade Bracelet Labradorite Femme, Bijou Pierre Naturelle Premium, Idee Cadeau Elegante",
        bullet_points: [
          "Style premium et symbolique pour sublimer le quotidien.",
          "Perles 8 mm selectionnees pour une presence elegante.",
          "Idee cadeau pleine de sens.",
          "Design facile a associer a une tenue chic.",
          "Confortable et harmonieux au quotidien.",
        ],
        description:
          "Un bracelet Felicidade pense pour les clientes qui recherchent un bijou pierre naturelle credible, elegant et facile a offrir.",
        backend_keywords: ["bracelet femme premium", "pierre naturelle cadeau"],
        seo_score: 86,
        conversion_score: 84,
        compliance_score: 95,
        overall_score: averageScore([86, 84, 95]),
        prompt_version: "listing_v1",
        created_at: now,
      },
    ];
  }

  if (demoVisualBriefs.length === 0) {
    demoVisualBriefs = [
      {
        id: "brief-seed-1",
        product_id: demoProducts[0].id,
        platform: "instagram",
        marketing_angle: "rituel quotidien",
        visual_type: "premium",
        primary_text: "Un bijou qui habille votre energie avec elegance",
        secondary_text: "Labradorite naturelle - style raffine - cadeau porteur de sens",
        mood: "Lumiere douce, tons creme, gris pierre et reflets argentes",
        composition:
          "Bracelet en gros plan sur fond texture clair avec espace reserve pour texte",
        design_instructions:
          "Creer un visuel editorial premium et minimaliste sans codes medicaux.",
        prompt_version: "visual_brief_v1",
        created_at: now,
      },
    ];
  }

  if (demoQueue.length === 0) {
    demoQueue = [
      {
        id: "queue-seed-1",
        product_id: demoProducts[0].id,
        generated_content_id: "content-seed-1",
        visual_brief_id: "brief-seed-1",
        platform: "instagram",
        status: "ready",
        scheduled_at: "2026-04-24T10:00:00.000Z",
        make_payload: {
          product_name: demoProducts[0].name,
          platform: "instagram",
          content: demoContents[0].body,
          hashtags: demoContents[0].hashtags,
          cta: demoContents[0].call_to_action,
          amazon_url: demoProducts[0].amazon_url,
          visual_brief: demoVisualBriefs[0].design_instructions,
          scheduled_time: "2026-04-24T10:00:00.000Z",
        },
        created_at: now,
      },
    ];
  }
}

seedDemoMvpData();
