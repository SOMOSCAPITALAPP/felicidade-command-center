import { NextResponse } from "next/server";

import { demoContents, demoListingVersions, demoVisualBriefs } from "@/lib/data/demo-store";

export async function GET() {
  return NextResponse.json({
    generatedContent: demoContents,
    listingVersions: demoListingVersions,
    visualBriefs: demoVisualBriefs,
  });
}
