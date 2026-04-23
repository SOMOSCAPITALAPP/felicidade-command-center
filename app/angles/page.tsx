import { AnglesWorkbench } from "@/components/angles/angles-workbench";
import { AppShell } from "@/components/layout/app-shell";

export default function AnglesPage() {
  return (
    <AppShell
      title="Angles emotionnels"
      description="Espace dedie a la generation et a la lecture rapide d angles marketing emotionnels directement exploitables en post, pub ou listing."
    >
      <AnglesWorkbench />
    </AppShell>
  );
}
