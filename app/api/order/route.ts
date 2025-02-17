import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// order
// id INT PRIMARY KEY,
// user_id INT,
// product_id INT, -- Reference to the Products table
// quantity INT,
// price DECIMAL(10, 2),
// total DECIMAL(10, 2),
// date DATE,
// status VARCHAR(50),
// FOREIGN KEY (user_id) REFERENCES Users(id),
// FOREIGN KEY (product_id) REFERENCES Products(id)

async function getAllOrders() {
  const client = await pool.connect();
  const result = await client.query("SELECT * FROM orders");
  client.release();

  try {
    console.log("Fetched orders:", result.rows);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.error();
  }
}

async function createOrder(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { user_id, product_id, quantity, price, total, date, status } = body;
  try {
    const result = await client.query(
      "INSERT INTO orders (user_id, product_id, quantity, price, total, date, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [user_id, product_id, quantity, price, total, date, status]
    );
    client.release();
    console.log("Created order:", result.rows[0]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Error creating order" },
      { status: 500 }
    );
  }
}

async function deleteOrder(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { id } = body;

  try {
    const q = "DELETE FROM orders WHERE id = $1";
    const result = await client.query(q, [id]);
    client.release();

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    console.log("Deleted order with ID:", id);
    return NextResponse.json({ message: "Order deleted successfully", id });
  } catch (error) {
    console.error("Error deleting order:", error);
    client.release();
    return NextResponse.json(
      { error: "Error deleting order" },
      { status: 500 }
    );
  }
}

async function updateOrder(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { id, user_id, product_id, quantity, price, total, date, status } =
    body;

  try {
    const fields = [];
    const values = [];
    let index = 1;

    if (user_id) {
      fields.push(`user_id = $${index++}`);
      values.push(user_id);
    }
    if (product_id) {
      fields.push(`product_id = $${index++}`);
      values.push(product_id);
    }
    if (quantity) {
      fields.push(`quantity = $${index++}`);
      values.push(quantity);
    }
    if (price) {
      fields.push(`price = $${index++}`);
      values.push(price);
    }
    if (total) {
      fields.push(`total = $${index++}`);
      values.push(total);
    }
    if (date) {
      fields.push(`date = $${index++}`);
      values.push(date);
    }
    if (status) {
      fields.push(`status = $${index++}`);
      values.push(status);
    }
    values.push(id);

    const query = `UPDATE orders SET ${fields.join(
      ", "
    )} WHERE id = $${index} RETURNING *`;

    const result = await client.query(query, values);
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    console.log("Updated order:", result.rows[0]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Error updating order" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return getAllOrders();
}

export async function POST(request: NextRequest) {
  return createOrder(request);
}

export async function DELETE(request: NextRequest) {
  return deleteOrder(request);
}

export async function PUT(request: NextRequest) {
  return updateOrder(request);
}
