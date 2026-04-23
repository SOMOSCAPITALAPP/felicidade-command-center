export type Platform = "facebook" | "instagram" | "tiktok" | "x" | "pinterest";
export type ContentTone =
  | "emotionnel"
  | "premium"
  | "cadeau"
  | "spirituel"
  | "luxe"
  | "minimaliste";
export type ContentObjective = "clic" | "achat" | "engagement";
export type ContentLength = "court" | "moyen" | "long";

export type Product = {
  id: string;
  name: string;
  asin: string;
  brand: string;
  product_type: string;
  main_stone: string;
  secondary_stones: string[];
  bead_size_mm: number | null;
  audience: string;
  price: number;
  margin: number;
  amazon_url: string;
  stock_status: "in_stock" | "low_stock" | "out_of_stock";
  bestseller_flag: boolean;
  seasonality: string;
  primary_keyword: string;
  secondary_keywords: string[];
  emotional_angles: string[];
  notes: string;
  emotional_richness_score: number;
  manual_priority: number;
  created_at: string;
};

export type GeneratedContent = {
  id: string;
  product_id: string;
  platform: Platform;
  tone: ContentTone;
  objective: ContentObjective;
  length: ContentLength;
  variant_label: string;
  hook: string;
  body: string;
  hashtags: string[];
  call_to_action: string;
  emotion_score: number;
  conversion_score: number;
  readability_score: number;
  overall_score: number;
  prompt_version: string;
  created_at: string;
};

export type ListingVersion = {
  id: string;
  product_id: string;
  marketing_angle: string;
  keyword_set: string[];
  title: string;
  bullet_points: string[];
  description: string;
  backend_keywords: string[];
  seo_score: number;
  conversion_score: number;
  compliance_score: number;
  overall_score: number;
  prompt_version: string;
  created_at: string;
};

export type MarketingAngle = {
  id: string;
  product_id: string;
  angle_name: string;
  dominant_emotion: string;
  symbolic_promise: string;
  target_customer: string;
  short_hook: string;
  recommended_usage: "post" | "ad" | "amazon";
  created_at: string;
};

export type VisualBrief = {
  id: string;
  product_id: string;
  platform: Platform;
  marketing_angle: string;
  visual_type: "premium" | "emotion" | "gift" | "minimalist";
  primary_text: string;
  secondary_text: string;
  mood: string;
  composition: string;
  design_instructions: string;
  prompt_version: string;
  created_at: string;
};

export type QueueItem = {
  id: string;
  product_id: string;
  generated_content_id: string | null;
  visual_brief_id: string | null;
  platform: Platform;
  status: "draft" | "ready" | "sent";
  scheduled_at: string;
  make_payload: {
    product_name: string;
    platform: Platform;
    content: string;
    hashtags: string[];
    cta: string;
    amazon_url: string;
    visual_brief: string;
    scheduled_time: string;
  };
  created_at: string;
};

export type DailyPriority = {
  id: string;
  product_id: string;
  priority_score: number;
  recommended_angle: string;
  recommended_platform: Platform;
  justification: string;
  rank_position: number;
};

export type GenerateContentInput = {
  productId: string;
  platform: Platform;
  tone: ContentTone;
  objective: ContentObjective;
  length: ContentLength;
  variantCount: number;
};

export type OptimizeListingInput = {
  productId: string;
  listing: string;
  keywords: string;
  marketingAngle: string;
};

export type GenerateVisualBriefInput = {
  productId: string;
  platform: Platform;
  marketingAngle: string;
};
