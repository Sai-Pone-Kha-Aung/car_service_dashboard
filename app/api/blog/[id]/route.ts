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
        const blog = result.rows[0];
        if (blog.image) {
          blog.image = `data:image/jpeg;base64,${blog.image.toString(
            "base64"
          )}`;
        }
        return NextResponse.json(blog);
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

export async function PATCH(request: NextRequest) {
  const client = await pool.connect();
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const query = `UPDATE blogs SET image = $1::bytea WHERE id = $2 RETURNING *`;
    const result = await client.query(query, [buffer, id]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Image updated successfully" });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Error uploading avatar" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

export async function PUT(request: NextRequest) {
  const client = await pool.connect();

  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const body = await request.json();
    const { title, tags, category, content } = body;

    const fields = [];
    const values = [];
    let index = 1;

    if (title) {
      fields.push(`title = $${index++}`);
      values.push(title);
    }
    if (tags) {
      fields.push(`tags = $${index++}`);
      values.push(tags);
    }
    if (category) {
      fields.push(`category = $${index++}`);
      values.push(category);
    }
    if (content) {
      fields.push(`content = $${index++}`);
      values.push(content);
    }

    values.push(id);

    const query = `UPDATE blogs SET ${fields.join(
      ", "
    )} WHERE id = $${index} RETURNING *`;

    const result = await client.query(query, values);
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    console.log("Updated blog:", result.rows[0]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating blog:", error);
    client.release();
    return NextResponse.json({ error: "Error updating blog" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return getBlogById(request);
}
