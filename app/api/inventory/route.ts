import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const [rows] = await pool.query("SELECT * FROM Inventory");

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json(
        { message: "No inventory found" },
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
    const q =
      "INSERT INTO Inventory ( name, quantity, reorder, price, service_id) VALUES ( ?, ?, ?, ?, ?)";
    const body = await request.json();
    console.log("Request body:", body);

    const inventory: Stock = {
      id: body[0].id,
      name: body[0].name,
      price: body[0].price,
      quantity: body[0].quantity,
      reorder: body[0].reorder,
      serviceId: body[0].service_id,
    };

    if (!inventory.name || !inventory.price) {
      return NextResponse.json(
        { error: "Please provide name and price" },
        { status: 400 }
      );
    }

    await pool.query(q, [
      inventory.name,
      inventory.quantity,
      inventory.reorder,
      inventory.price,
      inventory.serviceId,
    ]);
    return NextResponse.json({ message: "Inventory added" }, { status: 201 });
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
      "UPDATE Inventory SET name = ?, quantity = ?, reorder = ?, price = ?, service_id = ? WHERE id = ?";
    const body = await request.json();
    console.log("Request body:", body);

    const inventory: Stock = {
      id: body[0].id,
      name: body[0].name,
      price: body[0].price,
      quantity: body[0].quantity,
      reorder: body[0].reorder,
      serviceId: body[0].service_id,
    };

    console.log(
      "Parsed values:",
      inventory.id,
      inventory.name,
      inventory.quantity,
      inventory.reorder,
      inventory.price,
      inventory.serviceId
    );

    if (!inventory.id || !inventory.name || !inventory.price) {
      return NextResponse.json(
        { error: "Please provide name and price" },
        { status: 400 }
      );
    }

    await pool.query(q, [
      inventory.name,
      inventory.quantity,
      inventory.reorder,
      inventory.price,
      inventory.serviceId,
      inventory.id,
    ]);

    return NextResponse.json({ message: "Inventory updated" }, { status: 200 });
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
        { error: "Please provide serviceID" },
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
