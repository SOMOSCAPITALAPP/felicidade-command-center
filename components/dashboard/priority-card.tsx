import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function PriorityCard({
  rank,
  product,
  angle,
  platform,
  reason,
}: {
  rank: number;
  product: string;
  angle: string;
  platform: string;
  reason: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <Badge>Top {rank}</Badge>
        <span className="text-sm text-muted">{platform}</span>
      </div>
      <h4 className="mt-4 text-lg font-semibold">{product}</h4>
      <p className="mt-2 text-sm text-clay">{angle}</p>
      <p className="mt-3 text-sm leading-6 text-muted">{reason}</p>
    </Card>
  );
}
