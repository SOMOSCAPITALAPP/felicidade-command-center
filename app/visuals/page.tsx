import { AppShell } from "@/components/layout/app-shell";
import { VisualsWorkbench } from "@/components/visuals/visuals-workbench";

export default function VisualsPage() {
  return (
    <AppShell
      title="Briefs visuels"
      description="Page de preparation rapide de briefs Canva pour produire des creatives premium, credibles et faciles a transmettre."
    >
      <VisualsWorkbench />
    </AppShell>
  );
}
