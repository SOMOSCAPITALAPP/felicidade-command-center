import { NextResponse } from "next/server";

import { generateContent } from "@/lib/services/content-service";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const result = await generateContent(payload);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur generation contenu" },
      { status: 400 },
    );
  }
}
