import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "name, email, and password are required" },
      { status: 400 }
    );
  }

  try {
    const result = await client.query(
      "INSERT INTO users (name, email, password, createdat, updatedat) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, password, new Date(), new Date()]
    );

    client.release();
    console.log("Signed up successfully:", result.rows[0]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error sign up:", error);
    return NextResponse.json({ error: "Error sign up" }, { status: 500 });
  }
}
