import { AppShell } from "@/components/layout/app-shell";
import { LibraryWorkbench } from "@/components/library/library-workbench";

export default function LibraryPage() {
  return (
    <AppShell
      title="Bibliotheque"
      description="Historique centralise des contenus, listings et briefs pour retrouver vite ce qui fonctionne et le reutiliser sans repartir de zero."
    >
      <LibraryWorkbench />
    </AppShell>
  );
}
