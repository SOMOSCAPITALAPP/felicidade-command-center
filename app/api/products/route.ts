import { NextResponse } from "next/server";

import { createOrUpdateProduct, listProducts } from "@/lib/services/products-service";

export async function GET() {
  return NextResponse.json({ items: await listProducts() });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const product = await createOrUpdateProduct(payload);

  return NextResponse.json({ item: product }, { status: 201 });
}
