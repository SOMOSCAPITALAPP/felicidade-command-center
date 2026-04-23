import { Card } from "@/components/ui/card";

export function RecentContentList({ items }: { items: string[] }) {
  return (
    <Card className="p-5">
      <h4 className="text-lg font-semibold">Derniers contenus generes</h4>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-line bg-white/70 px-4 py-3 text-sm text-muted"
          >
            {item}
          </div>
        ))}
      </div>
    </Card>
  );
}
