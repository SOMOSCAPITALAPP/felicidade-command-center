import { Card } from "@/components/ui/card";

export function MakePayloadPreview() {
  return (
    <Card className="p-6">
      <h4 className="text-lg font-semibold">Payload Make</h4>
      <pre className="mt-4 overflow-x-auto rounded-2xl border border-line bg-[#221d18] p-4 text-xs leading-6 text-[#efe5d6]">
{`{
  "product_name": "Bracelet Apaisement Labradorite",
  "platform": "instagram",
  "content": "Texte marketing genere...",
  "hashtags": ["#braceletpierresnaturelles"],
  "cta": "Decouvrir sur Amazon",
  "amazon_url": "https://www.amazon.fr/dp/B0FELI001",
  "visual_brief": "Brief Canva...",
  "scheduled_time": "2026-04-24T10:00:00Z"
}`}
      </pre>
    </Card>
  );
}
