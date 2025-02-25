import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

async function getAllCars() {
  const client = await pool.connect();
  const result = await client.query("SELECT * FROM cars");
  client.release();

  try {
    console.log("Fetched cars:", result.rows);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.error();
  }
}

// id INT PRIMARY KEY,
// user_id INT,
// make VARCHAR(50),
// model VARCHAR(50),
// year INT,

async function createCar(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { user_id, make, model, year } = body;

  if (!user_id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const result = await client.query(
      "INSERT INTO cars (user_id, make, model, year) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, make, model, year]
    );
    client.release();
    console.log("Created car:", result.rows[0]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating car:", error);
    client.release();
    return NextResponse.json({ error: "Error creating car" }, { status: 500 });
  }
}

async function deleteCar(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { id } = body;

  try {
    const q = "DELETE FROM cars WHERE id = $1";
    const result = await client.query(q, [id]);
    client.release();
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    console.log("Deleted car with ID:", id);
    return NextResponse.json({ message: "Car deleted successfully", id });
  } catch (error) {
    console.error("Error deleting car:", error);
    client.release();
    return NextResponse.json({ error: "Error deleting car" }, { status: 500 });
  }
}

async function updateCar(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { id, make, model, year } = body;

  try {
    const fields = [];
    const values = [];
    let index = 1;

    if (make) {
      fields.push(`make = $${index++}`);
      values.push(make);
    }
    if (model) {
      fields.push(`model = $${index++}`);
      values.push(model);
    }
    if (year) {
      fields.push(`year = $${index++}`);
      values.push(year);
    }

    values.push(id);

    const query = `UPDATE cars SET ${fields.join(
      ", "
    )} WHERE id = $${index} RETURNING *`;

    const result = await client.query(query, values);
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    console.log("Updated car:", result.rows[0]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating car:", error);
    return NextResponse.json({ error: "Error updating car" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return getAllCars();
}

export async function POST(request: NextRequest) {
  return createCar(request);
}

export async function DELETE(request: NextRequest) {
  return deleteCar(request);
}

export async function PUT(request: NextRequest) {
  return updateCar(request);
}
