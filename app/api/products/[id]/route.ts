import { NextResponse } from "next/server";

import { getProduct } from "@/lib/services/products-service";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const product = await getProduct(id);

  if (!product) {
    return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
  }

  return NextResponse.json({ item: product });
}
