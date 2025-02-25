import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

async function getAllServices() {
  const client = await pool.connect();
  const result = await client.query("SELECT * FROM services");
  client.release();

  try {
    console.log("Fetched services:", result.rows);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.error();
  }
}
// id INT PRIMARY KEY,
// name VARCHAR(255),
// price DECIMAL(10, 2)
// title VARCHAR(255),
// description TEXT,
// category VARCHAR(255);

async function createService(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { name, price, title, description, category } = body;

  try {
    const result = await client.query(
      "INSERT INTO services (name, price, title, description, category ) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, price, title, description, category]
    );
    client.release();
    console.log("Created service:", result.rows[0]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { error: "Error creating service" },
      { status: 500 }
    );
  }
}

async function deleteService(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { id } = body;

  try {
    const q = "DELETE FROM services WHERE id = $1";
    const result = await client.query(q, [id]);
    client.release();

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    console.log("Deleted service with ID:", id);
    return NextResponse.json({ message: "Service deleted successfully", id });
  } catch (error) {
    console.error("Error deleting service:", error);
    client.release();
    return NextResponse.json(
      { error: "Error deleting service" },
      { status: 500 }
    );
  }
}

async function updateService(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { id, name, price, title, description, category } = body;

  try {
    const fields = [];
    const values = [];
    let index = 1;

    if (name) {
      fields.push(`name = $${index++}`);
      values.push(name);
    }
    if (price) {
      fields.push(`price = $${index++}`);
      values.push(price);
    }
    if (title) {
      fields.push(`title = $${index++}`);
      values.push(title);
    }
    if (description) {
      fields.push(`description = $${index++}`);
      values.push(description);
    }
    if (category) {
      fields.push(`category = $${index++}`);
      values.push(category);
    }
    values.push(id);

    const query = `UPDATE services SET ${fields.join(
      ", "
    )} WHERE id = $${index} RETURNING *`;

    const result = await client.query(query, values);
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    console.log("Updated service:", result.rows[0]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating service:", error);
    client.release();
    return NextResponse.json(
      { error: "Error updating service" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return getAllServices();
}

export async function POST(request: NextRequest) {
  return createService(request);
}

export async function DELETE(request: NextRequest) {
  return deleteService(request);
}

export async function PUT(request: NextRequest) {
  return updateService(request);
}
