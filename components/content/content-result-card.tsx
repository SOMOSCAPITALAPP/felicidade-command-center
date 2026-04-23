import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ContentResultCard() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">Sorties attendues</h4>
        <div className="text-sm text-muted">Score interne MVP</div>
      </div>
      <div className="mt-5 grid gap-4">
        <div className="rounded-2xl border border-line bg-white/75 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Hook</p>
          <p className="mt-2 text-sm text-ink">Accroche emotionnelle premium.</p>
        </div>
        <div className="rounded-2xl border border-line bg-white/75 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Texte principal</p>
          <p className="mt-2 text-sm text-ink">
            Le contenu genere apparaitra ici avec version emotionnelle, premium,
            cadeau et conversion.
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-white/75 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Hashtags et CTA</p>
          <p className="mt-2 text-sm text-ink">
            #braceletpierresnaturelles #bijoufemme · Decouvrir sur Amazon
          </p>
        </div>
      </div>
      <div className="mt-5 flex gap-3">
        <Button>Copier</Button>
        <Button variant="secondary">Sauvegarder</Button>
        <Button variant="ghost">Envoyer en queue</Button>
      </div>
    </Card>
  );
}
