import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

async function getAllBlog() {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM blogs");
    client.release();
    if (result.rows.length > 0) {
      // Map over all rows to convert image buffers to base64
      const blogs = result.rows.map((blog) => {
        if (blog.image) {
          blog.image = `data:image/jpeg;base64,${blog.image.toString(
            "base64"
          )}`;
        }
        return blog;
      });
      console.log("Fetched blogs:", blogs);
      return NextResponse.json(blogs);
    }

    // Return empty array if no blogs found (instead of an error)
    console.log("No blogs found");
    return NextResponse.json([]);

    console.log("Fetched blogs:", result.rows);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.error();
  }
}
// id INT PRIMARY KEY,
// title VARCHAR(255),
// tags VARCHAR(255),
// category VARCHAR(255),
// image VARCHAR(255),
// content TEXT,
// createdAt DATE

// async function createBlog(request: NextRequest) {
//   const client = await pool.connect();
//   const body = await request.json();
//   const { title, tags, category, content, createdAt } = body;

//   try {
//     const result = await client.query(
//       "INSERT INTO blogs (title, tags, category, content, createdAt) VALUES ($1, $2, $3, $4, $5) RETURNING *",
//       [title, tags, category, content, new Date()]
//     );
//     client.release();
//     console.log("Created blog:", result.rows[0]);
//     return NextResponse.json(result.rows[0]);
//   } catch (error) {
//     console.error("Error creating blog:", error);
//     return NextResponse.json({ error: "Error creating blog" }, { status: 500 });
//   }
// }

async function createBlog(request: NextRequest) {
  const formData = await request.formData();
  const client = await pool.connect();

  try {
    const title = formData.get("title") as string;
    const tags = formData.get("tags") as string;
    const category = formData.get("category") as string;
    const content = formData.get("content") as string;
    const imageFile = formData.get("image") as File;

    let imageBuffer = null;
    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      imageBuffer = Buffer.from(bytes);
    }

    const result = await client.query(
      "INSERT INTO blogs (title, tags, category, content, image, createdAt) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [title, tags, category, content, imageBuffer, new Date()]
    );

    client.release();
    console.log("Created blog:", result.rows[0]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating blog:", error);
    client.release();
    return NextResponse.json({ error: "Error creating blog" }, { status: 500 });
  }
}

async function deleteBlog(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { id } = body;

  try {
    const q = "DELETE FROM blogs WHERE id = $1";
    const result = await client.query(q, [id]);
    client.release();

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    console.log("Deleted blog with ID:", id);
    return NextResponse.json({
      message: "Blog deleted successfully",
      id: id,
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    client.release();
    return NextResponse.json({ error: "Error deleting blog" }, { status: 500 });
  }
}

async function updateBlog(request: NextRequest) {
  const client = await pool.connect();

  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const body = await request.json();
    const { title, tags, category, image, content } = body;

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
  return getAllBlog();
}

export async function POST(request: NextRequest) {
  return createBlog(request);
}

export async function DELETE(request: NextRequest) {
  return deleteBlog(request);
}

export async function PUT(request: NextRequest) {
  return updateBlog(request);
}
