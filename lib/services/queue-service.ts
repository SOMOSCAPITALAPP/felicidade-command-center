import { demoQueue, getProductById, saveQueueItem, demoContents, demoVisualBriefs } from "@/lib/data/demo-store";
import { buildMakePayload } from "@/lib/utils/make-payload";
import { QueueItem } from "@/lib/types";
import {
  fetchGeneratedContent,
  fetchProductById,
  fetchQueueItems,
  fetchVisualBriefs,
  insertQueueItem,
} from "@/lib/supabase/queries";
import { hasSupabase } from "@/lib/services/runtime-service";

export async function listQueueItems() {
  if (hasSupabase()) {
    return fetchQueueItems();
  }

  return demoQueue;
}

export async function createQueueItem(input: {
  productId: string;
  generatedContentId: string;
  visualBriefId?: string | null;
  scheduledAt: string;
}) {
  const product = hasSupabase()
    ? await fetchProductById(input.productId)
    : getProductById(input.productId);
  const contentPool = hasSupabase()
    ? await fetchGeneratedContent()
    : demoContents;
  const visualPool = hasSupabase() ? await fetchVisualBriefs() : demoVisualBriefs;
  const content = contentPool.find((item) => item.id === input.generatedContentId);
  const visualBrief = input.visualBriefId
    ? visualPool.find((item) => item.id === input.visualBriefId) ?? null
    : null;

  if (!product || !content) {
    throw new Error("Impossible de creer l element de queue.");
  }

  const item: QueueItem = {
    id: crypto.randomUUID(),
    product_id: product.id,
    generated_content_id: content.id,
    visual_brief_id: visualBrief?.id ?? null,
    platform: content.platform,
    status: "ready",
    scheduled_at: input.scheduledAt,
    make_payload: buildMakePayload({
      product,
      content,
      visualBrief,
      scheduledAt: input.scheduledAt,
    }),
    created_at: new Date().toISOString(),
  };

  return hasSupabase() ? insertQueueItem(item) : saveQueueItem(item);
}
