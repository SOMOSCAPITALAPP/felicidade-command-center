import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Topbar() {
  return (
    <div className="flex flex-col gap-4 rounded-[28px] border border-white/60 bg-paper/80 p-5 shadow-panel lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-muted">
          Daily workflow
        </p>
        <h2 className="mt-1 text-2xl font-semibold">
          Produire, optimiser, publier
        </h2>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Badge>Temps cible &lt; 10 sec</Badge>
        <Badge>Amazon compliant</Badge>
        <Button>Generer contenu</Button>
      </div>
    </div>
  );
}
