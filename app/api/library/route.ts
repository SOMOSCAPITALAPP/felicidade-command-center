import { NextResponse } from "next/server";

import { demoContents, demoListingVersions, demoVisualBriefs } from "@/lib/data/demo-store";
import {
  fetchGeneratedContent,
  fetchListingVersions,
  fetchVisualBriefs,
} from "@/lib/supabase/queries";
import { hasSupabase } from "@/lib/services/runtime-service";

export async function GET() {
  if (hasSupabase()) {
    return NextResponse.json({
      generatedContent: await fetchGeneratedContent(),
      listingVersions: await fetchListingVersions(),
      visualBriefs: await fetchVisualBriefs(),
    });
  }

  return NextResponse.json({
    generatedContent: demoContents,
    listingVersions: demoListingVersions,
    visualBriefs: demoVisualBriefs,
  });
}
