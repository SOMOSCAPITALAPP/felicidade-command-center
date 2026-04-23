import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function ListingResult() {
  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>SEO 86</Badge>
        <Badge>Conversion 84</Badge>
        <Badge>Conformite 95</Badge>
      </div>
      <div className="mt-5 space-y-4">
        <div className="rounded-2xl border border-line bg-white/75 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Titre optimise</p>
          <p className="mt-2 text-sm">
            Felicidade Bracelet Labradorite Femme, Bijou Pierre Naturelle Premium,
            Idee Cadeau Elegante
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-white/75 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">5 bullet points</p>
          <p className="mt-2 text-sm text-muted">
            La version generatee du listing sera visible ici.
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-white/75 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Description et backend keywords</p>
          <p className="mt-2 text-sm text-muted">
            Le rendu final sera pret a copier dans Amazon Seller Central.
          </p>
        </div>
      </div>
    </Card>
  );
}
