import { NextResponse } from "next/server";

import { generateVisualPreview } from "@/lib/services/visual-preview-service";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const result = await generateVisualPreview(payload);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur generation preview photo",
      },
      { status: 400 },
    );
  }
}
