import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

async function getCustomerById(request: NextRequest) {
  try {
    const client = await pool.connect();
    const url = new URL(request.url);
    const customerId = url.pathname.split("/").pop();
    console.log("Request URL:", request.url);
    console.log("Extracted customerId:", customerId);
    if (customerId) {
      const result = await client.query("SELECT * FROM users WHERE id = $1", [
        customerId,
      ]);
      client.release();

      if (result.rows.length > 0) {
        return NextResponse.json(result.rows[0]);
      }

      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    client.release();

    return NextResponse.json(
      { error: "Customer ID is required" },
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
  return getCustomerById(request);
}
