import { NextResponse, NextRequest } from "next/server";
import pool from "@/lib/db";

async function getCarByUserId(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("id");
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM cars WHERE user_id = $1", [
      userId,
    ]);
    console.log("Fetched cars:", result.rows);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.error();
  } finally {
    client.release();
  }
}

export async function GET(request: NextRequest) {
  return getCarByUserId(request);
}
