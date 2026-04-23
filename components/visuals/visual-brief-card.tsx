import { Card } from "@/components/ui/card";

export function VisualBriefCard() {
  return (
    <Card className="p-6">
      <h4 className="text-lg font-semibold">Structure du brief</h4>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {[
          "Type de visuel",
          "Texte principal",
          "Texte secondaire",
          "Ambiance",
          "Composition",
          "Instructions design",
        ].map((label) => (
          <div
            key={label}
            className="rounded-2xl border border-line bg-white/75 p-4"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-muted">
              {label}
            </p>
            <p className="mt-2 text-sm text-muted">
              Le resultat genere s affichera ici.
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
