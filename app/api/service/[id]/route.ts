import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

async function getServiceById(request: NextRequest) {
  try {
    const client = await pool.connect();
    const url = new URL(request.url);
    const serviceId = url.pathname.split("/").pop();
    console.log("Request URL:", request.url);
    console.log("Extracted serviceId:", serviceId);
    if (serviceId) {
      const result = await client.query(
        "SELECT * FROM services WHERE id = $1",
        [serviceId]
      );
      client.release();

      if (result.rows.length > 0) {
        return NextResponse.json(result.rows[0]);
      }

      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    client.release();

    return NextResponse.json(
      { error: "Service ID is required" },
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
  return getServiceById(request);
}
