import { NextResponse } from "next/server";

import { getDailyPriorities } from "@/lib/services/priority-service";

export async function GET() {
  return NextResponse.json({ items: await getDailyPriorities() });
}
