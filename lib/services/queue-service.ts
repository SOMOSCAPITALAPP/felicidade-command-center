import { demoQueue, getProductById, saveQueueItem, demoContents, demoVisualBriefs } from "@/lib/data/demo-store";
import { buildMakePayload } from "@/lib/utils/make-payload";
import { QueueItem } from "@/lib/types";

export function listQueueItems() {
  return demoQueue;
}

export function createQueueItem(input: {
  productId: string;
  generatedContentId: string;
  visualBriefId?: string | null;
  scheduledAt: string;
}) {
  const product = getProductById(input.productId);
  const content = demoContents.find((item) => item.id === input.generatedContentId);
  const visualBrief = input.visualBriefId
    ? demoVisualBriefs.find((item) => item.id === input.visualBriefId) ?? null
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

  return saveQueueItem(item);
}
