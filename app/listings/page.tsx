import { AppShell } from "@/components/layout/app-shell";
import { ListingWorkbench } from "@/components/listings/listing-workbench";

export default function ListingsPage() {
  return (
    <AppShell
      title="Optimiseur listing Amazon"
      description="Workflow concentre sur le titre, les bullets, la description et les backend keywords pour gagner du temps sur Seller Central."
    >
      <ListingWorkbench />
    </AppShell>
  );
}
