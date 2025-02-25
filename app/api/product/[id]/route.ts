import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

async function getProductbyId(request: NextRequest) {
  try {
    const client = await pool.connect();
    const url = new URL(request.url);
    const productId = url.pathname.split("/").pop();
    console.log("Request URL:", request.url);
    console.log("Extracted productId:", productId);
    if (productId) {
      const result = await client.query(
        "SELECT * FROM products WHERE id = $1",
        [productId]
      );
      client.release();

      if (result.rows.length > 0) {
        const product = result.rows[0];
        if (product.image) {
          // Convert Buffer to base64
          product.image = `data:image/jpeg;base64,${product.image.toString(
            "base64"
          )}`;
        }
        return NextResponse.json(product);
      }

      if (result.rows.length > 0) {
        return NextResponse.json(result.rows[0]);
      }

      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    client.release();

    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return getProductbyId(request);
}
