import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(request: NextRequest) {
  const client = await pool.connect();
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const formData = await request.formData();
    const file = formData.get("avatar") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const query = `UPDATE staff SET avatar = $1::bytea WHERE id = $2 RETURNING *`;
    const result = await client.query(query, [buffer, id]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Staff not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Avatar updated successfully" });
  } catch (error) {
    console.error("Error uploading avatar:", error);
    return NextResponse.json(
      { error: "Error uploading avatar" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
