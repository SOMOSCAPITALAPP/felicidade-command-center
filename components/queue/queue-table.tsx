import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type QueueItem = {
  product: string;
  platform: string;
  status: string;
  scheduled: string;
};

export function QueueTable({ items }: { items: QueueItem[] }) {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-line p-5">
        <h4 className="text-lg font-semibold">File de publication</h4>
        <p className="mt-2 text-sm text-muted">
          Contenus prets a etre pousses vers Make.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#f3ecdf] text-muted">
            <tr>
              <th className="px-5 py-4 font-medium">Produit</th>
              <th className="px-5 py-4 font-medium">Plateforme</th>
              <th className="px-5 py-4 font-medium">Statut</th>
              <th className="px-5 py-4 font-medium">Publication</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={`${item.product}-${item.platform}`} className="border-t border-line">
                <td className="px-5 py-4">{item.product}</td>
                <td className="px-5 py-4 text-muted">{item.platform}</td>
                <td className="px-5 py-4">
                  <Badge>{item.status}</Badge>
                </td>
                <td className="px-5 py-4 text-muted">{item.scheduled}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
