import { Card } from "@/components/ui/card";

export function LibraryFilters() {
  return (
    <Card className="p-5">
      <h4 className="text-lg font-semibold">Filtres bibliotheque</h4>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {["Produit", "Plateforme", "Ton", "Type"].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-line bg-white/75 px-4 py-3 text-sm text-muted"
          >
            {item}
          </div>
        ))}
      </div>
    </Card>
  );
}
