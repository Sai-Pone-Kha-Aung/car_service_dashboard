import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

async function getAllStaffs() {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM staff");
    client.release();
    if (result.rows.length > 0) {
      // Map over all rows to convert image buffers to base64
      const staffs = result.rows.map((staff) => {
        if (staff.avatar) {
          staff.avatar = `data:image/jpeg;base64,${staff.avatar.toString(
            "base64"
          )}`;
        }
        return staff;
      });
    }

    console.log("Fetched staff:", result.rows);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching staff:", error);
    return NextResponse.error();
  }
}
// id INT PRIMARY KEY,
// name VARCHAR(255),
// role VARCHAR(50),
// email VARCHAR(255),
// avatar VARCHAR(255)

async function createStaff(request: NextRequest) {
  const formData = await request.formData();
  const client = await pool.connect();

  try {
    const id = formData.get("id");
    const name = formData.get("name");
    const role = formData.get("role");
    const email = formData.get("email");
    const imageFile = formData.get("avatar") as File;

    let imageBuffer = null;
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      imageBuffer = Buffer.from(bytes);
    }

    const result = await client.query(
      "INSERT INTO staff (name, role, email, avatar) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, role, email, imageBuffer]
    );
    client.release();
    console.log("Created staff:", result.rows[0]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating staff:", error);
    return NextResponse.json(
      { error: "Error creating staff" },
      { status: 500 }
    );
  }
}

async function deleteStaff(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { id } = body;

  try {
    const q = "DELETE FROM staff WHERE id = $1";
    const result = await client.query(q, [id]);
    client.release();

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Staff not found" }, { status: 404 });
    }

    console.log("Deleted staff with ID:", id);
    return NextResponse.json({ message: "Staff deleted successfully", id });
  } catch (error) {
    console.error("Error deleting blog:", error);
    client.release();
    return NextResponse.json({ error: "Error deleting blog" }, { status: 500 });
  }
}

async function updateStaff(request: NextRequest) {
  const client = await pool.connect();
  const formData = await request.formData();

  try {
    const id = formData.get("id");
    const name = formData.get("name");
    const role = formData.get("role");
    const email = formData.get("email");
    const imageFile = formData.get("avatar") as File;

    let imageBuffer = null;
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      imageBuffer = Buffer.from(bytes);
    }

    const fields = [];
    const values = [];
    let index = 1;

    if (name) {
      fields.push(`name = $${index++}`);
      values.push(name);
    }
    if (role) {
      fields.push(`role = $${index++}`);
      values.push(role);
    }
    if (email) {
      fields.push(`email = $${index++}`);
      values.push(email);
    }
    if (imageFile) {
      fields.push(`avatar = $${index++}`);
      values.push(imageBuffer);
    }

    values.push(id);

    const query = `UPDATE staff SET ${fields.join(
      ", "
    )} WHERE id = $${index} RETURNING *`;

    const result = await client.query(query, values);
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Staff not found" }, { status: 404 });
    }

    console.log("Updated staff:", result.rows[0]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating staff:", error);
    client.release();
    return NextResponse.json(
      { error: "Error updating staff" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return getAllStaffs();
}

export async function POST(request: NextRequest) {
  return createStaff(request);
}

export async function DELETE(request: NextRequest) {
  return deleteStaff(request);
}

export async function PUT(request: NextRequest) {
  return updateStaff(request);
}
