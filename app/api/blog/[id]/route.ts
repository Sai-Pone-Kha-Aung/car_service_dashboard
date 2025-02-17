import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

async function getBlogById(request: NextRequest) {
  try {
    const client = await pool.connect();
    const url = new URL(request.url);
    const blogId = url.pathname.split("/").pop();
    console.log("Request URL:", request.url);
    console.log("Extracted blogId:", blogId);
    if (blogId) {
      const result = await client.query("SELECT * FROM blogs WHERE id = $1", [
        blogId,
      ]);
      client.release();

      if (result.rows.length > 0) {
        return NextResponse.json(result.rows[0]);
      }

      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    client.release();

    return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return getBlogById(request);
}
