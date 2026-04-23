import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ContentGeneratorForm() {
  return (
    <Card className="p-6">
      <h4 className="text-lg font-semibold">Formulaire de generation</h4>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          "Produit",
          "Plateforme",
          "Ton",
          "Objectif",
          "Longueur",
          "Nombre de variantes",
        ].map((label) => (
          <label key={label} className="text-sm text-muted">
            {label}
            <div className="mt-2 rounded-2xl border border-line bg-white/80 px-4 py-3 text-ink">
              {label}
            </div>
          </label>
        ))}
      </div>
      <div className="mt-5 flex gap-3">
        <Button>Generer</Button>
        <Button variant="secondary">Sauvegarder preset</Button>
      </div>
    </Card>
  );
}
