import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function AngleCard({ index }: { index: number }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">Angle {index}</h4>
        <Badge>Post</Badge>
      </div>
      <p className="mt-3 text-sm font-medium text-clay">Emotion dominante</p>
      <p className="mt-2 text-sm leading-6 text-muted">
        Carte prevue pour afficher angle, promesse symbolique, cible et accroche.
      </p>
    </Card>
  );
}
