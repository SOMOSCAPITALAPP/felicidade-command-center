import { NextResponse } from "next/server";

import { generateVisualBrief } from "@/lib/services/visual-brief-service";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const result = await generateVisualBrief(payload);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur generation brief visuel" },
      { status: 400 },
    );
  }
}
