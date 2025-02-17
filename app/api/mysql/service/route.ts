import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const [rows] = await pool.query("SELECT * FROM Services");

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json(
        { message: "No services found" },
        { status: 404 }
      );
    }
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const q = "INSERT INTO Services ( name, price) VALUES ( ?, ?)";
    const body = await request.json();
    console.log("Request body:", body);

    const service: ServiceData = {
      id: body[0].id,
      name: body[0].name,
      price: body[0].price,
    };

    if (!service.name || !service.price) {
      return NextResponse.json(
        { error: "Please provide name and price" },
        { status: 400 }
      );
    }

    await pool.query(q, [service.name, service.price]);
    return NextResponse.json({ message: "Service added" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const q = "UPDATE Services SET name = ?, price = ? WHERE id = ?";
    const body = await request.json();
    console.log("Request body:", body);

    const service: ServiceData = {
      id: body[0].id,
      name: body[0].name,
      price: body[0].price,
    };
    console.log("Parsed values:", service.id, service.name, service.price);
    if (!service.id || !service.name || !service.price) {
      return NextResponse.json(
        { error: "Please provide name and price" },
        { status: 400 }
      );
    }
    await pool.query(q, [service.name, service.price, service.id]);
    return NextResponse.json({ message: "Service updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const q = "DELETE FROM Inventory WHERE id = ?";
    const body = await request.json();

    if (!body[0].id) {
      return NextResponse.json(
        { error: "Please provide InventoryID" },
        { status: 400 }
      );
    }
    console.log("Request body:", body);
    await pool.query(q, [body[0].id]);
    return NextResponse.json({ message: "Inventory deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
