import { NextResponse } from "next/server";

import { createQueueItem, listQueueItems } from "@/lib/services/queue-service";

export async function GET() {
  return NextResponse.json({ items: await listQueueItems() });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const item = await createQueueItem(payload);

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur queue publication" },
      { status: 400 },
    );
  }
}
