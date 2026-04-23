import { GeneratedContent, Product, QueueItem, VisualBrief } from "@/lib/types";

export function buildMakePayload(input: {
  product: Product;
  content: GeneratedContent;
  visualBrief?: VisualBrief | null;
  scheduledAt: string;
}): QueueItem["make_payload"] {
  return {
    product_name: input.product.name,
    platform: input.content.platform,
    content: input.content.body,
    hashtags: input.content.hashtags,
    cta: input.content.call_to_action,
    amazon_url: input.product.amazon_url,
    visual_brief: input.visualBrief?.design_instructions ?? "",
    scheduled_time: input.scheduledAt,
  };
}
