import { NextResponse, NextRequest } from "next/server";
import pool from "@/lib/db";

export async function POST(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: "email and password are required" },
      { status: 400 }
    );
  }

  try {
    const result = await client.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const user = result.rows[0];
    console.log("Signed in user:", user);
    return NextResponse.json({
      success: true,
      message: "Signed in successfully",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error signing in:", error);
    return NextResponse.json({ error: "Error signing in" }, { status: 500 });
  }
}
