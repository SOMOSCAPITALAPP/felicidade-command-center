import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function VisualBriefForm() {
  return (
    <Card className="p-6">
      <h4 className="text-lg font-semibold">Generer un brief Canva</h4>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {["Produit", "Plateforme", "Angle marketing"].map((label) => (
          <label key={label} className="text-sm text-muted">
            {label}
            <div className="mt-2 rounded-2xl border border-line bg-white/80 px-4 py-3 text-ink">
              {label}
            </div>
          </label>
        ))}
      </div>
      <div className="mt-5 flex gap-3">
        <Button>Generer brief</Button>
        <Button variant="secondary">Sauvegarder</Button>
      </div>
    </Card>
  );
}
