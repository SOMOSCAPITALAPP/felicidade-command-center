import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ListingOptimizerForm() {
  return (
    <Card className="p-6">
      <h4 className="text-lg font-semibold">Optimiser un listing Amazon</h4>
      <div className="mt-5 grid gap-4">
        {["Produit", "Listing actuel", "Mots-cles", "Angle marketing"].map(
          (label) => (
            <label key={label} className="text-sm text-muted">
              {label}
              <div className="mt-2 min-h-14 rounded-2xl border border-line bg-white/80 px-4 py-3 text-ink">
                {label}
              </div>
            </label>
          ),
        )}
      </div>
      <div className="mt-5 flex gap-3">
        <Button>Generer version</Button>
        <Button variant="secondary">Sauvegarder brouillon</Button>
      </div>
    </Card>
  );
}
