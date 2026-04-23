import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ProductDetailCard() {
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge>ASIN B0FELI001</Badge>
            <Badge>Felicidade</Badge>
            <Badge>In stock</Badge>
          </div>
          <h4 className="mt-4 text-2xl font-semibold">
            Bracelet Apaisement Labradorite
          </h4>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            Fiche produit detaillee pour centraliser les informations Amazon,
            les angles marketing et les actions rapides du MVP.
          </p>
        </div>
        <div className="flex gap-3">
          <Button>Generer contenu</Button>
          <Button variant="secondary">Optimiser listing</Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-line bg-white/70 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Pierre</p>
          <p className="mt-2 text-lg font-semibold">Labradorite</p>
        </div>
        <div className="rounded-2xl border border-line bg-white/70 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Audience</p>
          <p className="mt-2 text-lg font-semibold">Femme</p>
        </div>
        <div className="rounded-2xl border border-line bg-white/70 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Prix</p>
          <p className="mt-2 text-lg font-semibold">39,90 EUR</p>
        </div>
        <div className="rounded-2xl border border-line bg-white/70 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Mot-cle</p>
          <p className="mt-2 text-lg font-semibold">
            bracelet pierre naturelle femme
          </p>
        </div>
      </div>
    </Card>
  );
}
