import { NextResponse } from "next/server";

import { optimizeListing } from "@/lib/services/listing-service";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const result = await optimizeListing(payload);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur optimisation listing" },
      { status: 400 },
    );
  }
}
