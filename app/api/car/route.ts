import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

interface Car {
  id: number;
  customer_id: number;
  name: string;
  make: string;
  model: string;
  year: string;
  problem: string;
}

export async function GET(request: NextRequest) {
  try {
    const q = "SELECT * FROM Cars";
    const [carsRows] = await pool.query(q);

    if (!Array.isArray(carsRows) || carsRows.length === 0) {
      return NextResponse.json({ message: "No cars found" }, { status: 404 });
    }
    return NextResponse.json(carsRows, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const q =
      "INSERT INTO Cars ( customer_id, name, make, model, year, problem) VALUES ( ?, ?, ?, ?, ?, ?)";
    const body = await request.json();
    console.log("Request body:", body);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const q =
      "UPDATE Cars SET name = ?, make = ?, model = ?, year = ?, problem = ? WHERE id = ?";
    const body = await request.json();
    console.log("Request body:", body);

    const car: Car = {
      id: body[0].id,
      customer_id: body[0].customer_id,
      name: body[0].name,
      make: body[0].make,
      model: body[0].model,
      year: body[0].year,
      problem: body[0].problem,
    };

    console.log(
      "Parsed values:",
      car.id,
      car.name,
      car.make,
      car.model,
      car.year,
      car.problem
    );

    if (!car.id || !car.name || !car.make || !car.model || !car.year) {
      return NextResponse.json(
        { error: "Please provide name, make, model, year" },
        { status: 400 }
      );
    }

    await pool.query(q, [
      car.name,
      car.make,
      car.model,
      car.year,
      car.problem,
      car.id,
    ]);

    return NextResponse.json({ message: "Car updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const q = "DELETE FROM Cars WHERE id = ?";
    const body = await request.json();
    console.log("Request body:", body);

    const car: Car = {
      id: body[0].id,
      customer_id: body[0].customer_id,
      name: body[0].name,
      make: body[0].make,
      model: body[0].model,
      year: body[0].year,
      problem: body[0].problem,
    };

    console.log("Parsed values:", car.id);

    if (!car.id) {
      console.log("Missing car ID");
      return NextResponse.json({ error: "Please provide id" }, { status: 400 });
    }

    await pool.query(q, [car.id]);
    console.log("Deleted car:", car.id);

    return NextResponse.json({ message: "Car deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
