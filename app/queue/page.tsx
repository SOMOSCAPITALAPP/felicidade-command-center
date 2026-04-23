import { AppShell } from "@/components/layout/app-shell";
import { QueueWorkbench } from "@/components/queue/queue-workbench";

export default function QueuePage() {
  return (
    <AppShell
      title="Queue de publication"
      description="Vue utile pour preparer l envoi vers Make, suivre les statuts et garder une publication structuree sans ajouter de complexite prematuree."
    >
      <QueueWorkbench />
    </AppShell>
  );
}
