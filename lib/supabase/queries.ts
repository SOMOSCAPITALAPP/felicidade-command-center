import { getSupabaseServerClient } from "@/lib/supabase/server";
import {
  GeneratedContent,
  ListingVersion,
  MarketingAngle,
  Product,
  QueueItem,
  VisualBrief,
} from "@/lib/types";

function requireSupabase() {
  const client = getSupabaseServerClient();

  if (!client) {
    throw new Error("Supabase n'est pas configure.");
  }

  return client;
}

export async function fetchProducts() {
  const supabase = requireSupabase();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function fetchProductById(productId: string) {
  const supabase = requireSupabase();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .maybeSingle();

  if (error) throw error;
  return (data as Product | null) ?? null;
}

export async function upsertProductRow(product: Partial<Product>) {
  const supabase = requireSupabase();
  const payload = {
    ...product,
    id: product.id ?? crypto.randomUUID(),
  };

  const { data, error } = await supabase
    .from("products")
    .upsert(payload)
    .select("*")
    .single();

  if (error) throw error;
  return data as Product;
}

export async function insertGeneratedContents(items: GeneratedContent[]) {
  const supabase = requireSupabase();
  const { data, error } = await supabase
    .from("generated_content")
    .insert(
      items.map((item) => ({
        id: item.id,
        product_id: item.product_id,
        platform: item.platform,
        tone: item.tone,
        objective: item.objective,
        length: item.length,
        variant_label: item.variant_label,
        hook: item.hook,
        body: item.body,
        hashtags: item.hashtags,
        call_to_action: item.call_to_action,
        emotion_score: item.emotion_score,
        conversion_score: item.conversion_score,
        readability_score: item.readability_score,
        prompt_version: item.prompt_version,
      })),
    )
    .select("*");

  if (error) throw error;

  return ((data ?? []) as Array<
    Omit<GeneratedContent, "overall_score"> & { overall_score?: number }
  >).map((item) => ({
    ...item,
    overall_score:
      item.overall_score ??
      Math.round(
        (item.emotion_score + item.conversion_score + item.readability_score) / 3,
      ),
  }));
}

export async function fetchGeneratedContent(productId?: string) {
  const supabase = requireSupabase();
  let query = supabase
    .from("generated_content")
    .select("*")
    .order("created_at", { ascending: false });

  if (productId) {
    query = query.eq("product_id", productId);
  }

  const { data, error } = await query;
  if (error) throw error;

  return ((data ?? []) as Array<
    Omit<GeneratedContent, "overall_score"> & { overall_score?: number }
  >).map((item) => ({
    ...item,
    overall_score:
      item.overall_score ??
      Math.round(
        (item.emotion_score + item.conversion_score + item.readability_score) / 3,
      ),
  }));
}

export async function insertListingVersion(item: ListingVersion) {
  const supabase = requireSupabase();
  const { data, error } = await supabase
    .from("listing_versions")
    .insert({
      id: item.id,
      product_id: item.product_id,
      marketing_angle: item.marketing_angle,
      keyword_set: item.keyword_set,
      title: item.title,
      bullet_points: item.bullet_points,
      description: item.description,
      backend_keywords: item.backend_keywords,
      seo_score: item.seo_score,
      conversion_score: item.conversion_score,
      compliance_score: item.compliance_score,
      is_current: true,
      prompt_version: item.prompt_version,
    })
    .select("*")
    .single();

  if (error) throw error;

  const row = data as ListingVersion & { overall_score?: number };
  return {
    ...row,
    bullet_points: Array.isArray(row.bullet_points)
      ? row.bullet_points
      : [],
    overall_score:
      row.overall_score ??
      Math.round((row.seo_score + row.conversion_score + row.compliance_score) / 3),
  };
}

export async function fetchListingVersions(productId?: string) {
  const supabase = requireSupabase();
  let query = supabase
    .from("listing_versions")
    .select("*")
    .order("created_at", { ascending: false });

  if (productId) {
    query = query.eq("product_id", productId);
  }

  const { data, error } = await query;
  if (error) throw error;

  return ((data ?? []) as Array<ListingVersion & { overall_score?: number }>).map(
    (row) => ({
      ...row,
      bullet_points: Array.isArray(row.bullet_points) ? row.bullet_points : [],
      overall_score:
        row.overall_score ??
        Math.round(
          (row.seo_score + row.conversion_score + row.compliance_score) / 3,
        ),
    }),
  );
}

export async function replaceMarketingAngles(
  productId: string,
  items: MarketingAngle[],
) {
  const supabase = requireSupabase();
  const { error: deleteError } = await supabase
    .from("marketing_angles")
    .delete()
    .eq("product_id", productId);

  if (deleteError) throw deleteError;

  const { data, error } = await supabase
    .from("marketing_angles")
    .insert(items)
    .select("*");

  if (error) throw error;
  return (data ?? []) as MarketingAngle[];
}

export async function fetchMarketingAngles(productId?: string) {
  const supabase = requireSupabase();
  let query = supabase
    .from("marketing_angles")
    .select("*")
    .order("created_at", { ascending: false });

  if (productId) {
    query = query.eq("product_id", productId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as MarketingAngle[];
}

export async function insertVisualBrief(item: VisualBrief) {
  const supabase = requireSupabase();
  const { data, error } = await supabase
    .from("visual_briefs")
    .insert(item)
    .select("*")
    .single();

  if (error) throw error;
  return data as VisualBrief;
}

export async function fetchVisualBriefs(productId?: string) {
  const supabase = requireSupabase();
  let query = supabase
    .from("visual_briefs")
    .select("*")
    .order("created_at", { ascending: false });

  if (productId) {
    query = query.eq("product_id", productId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as VisualBrief[];
}

export async function insertQueueItem(item: QueueItem) {
  const supabase = requireSupabase();
  const { data, error } = await supabase
    .from("publishing_queue")
    .insert(item)
    .select("*")
    .single();

  if (error) throw error;
  return data as QueueItem;
}

export async function fetchQueueItems() {
  const supabase = requireSupabase();
  const { data, error } = await supabase
    .from("publishing_queue")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as QueueItem[];
}

export async function refreshDailyPriorities(rows: Array<{
  product_id: string;
  priority_score: number;
  recommended_angle: string;
  recommended_platform: string;
  justification: string;
  rank_position: number;
}>) {
  const supabase = requireSupabase();
  const today = new Date().toISOString().slice(0, 10);

  const { error: deleteError } = await supabase
    .from("daily_priorities")
    .delete()
    .eq("priority_date", today);

  if (deleteError) throw deleteError;

  const { data, error } = await supabase
    .from("daily_priorities")
    .insert(rows.map((row) => ({ ...row, priority_date: today })))
    .select("*");

  if (error) throw error;
  return data ?? [];
}

export async function fetchDailyPriorities() {
  const supabase = requireSupabase();
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from("daily_priorities")
    .select("*")
    .eq("priority_date", today)
    .order("rank_position", { ascending: true });

  if (error) throw error;
  return data ?? [];
}
