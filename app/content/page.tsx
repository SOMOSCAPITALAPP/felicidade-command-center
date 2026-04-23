import { AppShell } from "@/components/layout/app-shell";
import { ContentWorkbench } from "@/components/content/content-workbench";

export default async function ContentPage({
  searchParams,
}: {
  searchParams: Promise<{ productId?: string }>;
}) {
  const params = await searchParams;

  return (
    <AppShell
      title="Generateur de contenu"
      description="Page principale pour produire rapidement des variantes marketing multi-plateforme avec une sortie exploitable en un clic."
    >
      <ContentWorkbench initialProductId={params.productId} />
    </AppShell>
  );
}
