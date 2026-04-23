import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { AppShell } from "@/components/layout/app-shell";

export default function DashboardPage() {
  return (
    <AppShell
      title="Dashboard"
      description="Vue d ensemble operationnelle pour choisir le bon produit, lancer les actions les plus rentables et garder le rythme de production."
    >
      <DashboardOverview />
    </AppShell>
  );
}
