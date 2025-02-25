import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { get } from "http";

async function getCartbyId(request: NextRequest) {
  try {
    const client = await pool.connect();
    const url = new URL(request.url);
    const cartUserID = url.pathname.split("/").pop();
    console.log("Request URL:", request.url);
    console.log("Extracted cartUserID:", cartUserID);
    if (cartUserID) {
      const result = await client.query(
        "SELECT * FROM cart WHERE user_id = $1",
        [cartUserID]
      );
      client.release();

      if (result.rows.length > 0) {
        const cart = result.rows[0];
        if (cart.image) {
          // Convert Buffer to base64
          cart.image = `data:image/jpeg;base64,${cart.image.toString(
            "base64"
          )}`;
        }
        return NextResponse.json(cart);
      }

      if (result.rows.length > 0) {
        return NextResponse.json(result.rows[0]);
      }

      return NextResponse.json({ error: "cart not found" }, { status: 404 });
    }

    client.release();

    return NextResponse.json({ error: "Cart ID is required" }, { status: 400 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return getCartbyId(request);
}
