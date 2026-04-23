import { NextResponse } from "next/server";

import { generateAngles } from "@/lib/services/angles-service";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const result = await generateAngles(payload.productId);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur generation angles" },
      { status: 400 },
    );
  }
}
