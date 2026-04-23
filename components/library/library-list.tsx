import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function LibraryList() {
  return (
    <div className="grid gap-4">
      {[
        "Contenu Instagram - Labradorite - Emotionnel",
        "Listing Amazon - Labradorite - Premium",
        "Brief visuel - Quartz Rose - Cadeau",
      ].map((item) => (
        <Card key={item} className="p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h4 className="text-lg font-semibold">{item}</h4>
              <p className="mt-2 text-sm text-muted">
                Espace prevu pour reutiliser, dupliquer et comparer les contenus.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary">Dupliquer</Button>
              <Button>Reutiliser</Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
