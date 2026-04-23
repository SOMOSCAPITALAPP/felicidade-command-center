import { NextResponse } from "next/server";

import { getRuntimeMode } from "@/lib/services/runtime-service";

export async function GET() {
  return NextResponse.json({
    runtime: getRuntimeMode(),
  });
}
