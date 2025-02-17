import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const q = "INSERT INTO Users (username, password, email) VALUES (?, ?, ?)";
    const body = await request.json();
    console.log("Request body:", body);

    const user = {
      username: body.username,
      password: body.password,
      email: body.email,
    };

    if (!user.username || !user.password || !user.email) {
      return NextResponse.json(
        { error: "Please provide username, password, and email" },
        { status: 400 }
      );
    }

    await pool.query(q, [user.username, user.password, user.email]);
    return NextResponse.json({ message: "User registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
