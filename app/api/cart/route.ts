import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// CREATE TABLE Cart (
//     id INT PRIMARY KEY,
//     user_id INT,
//     name VARCHAR(255),
//     price DECIMAL(10, 2),
//     quantity INT,
//     product_id INT,
//     FOREIGN KEY (user_id) REFERENCES Users(id),
//     FOREIGN KEY (product_id) REFERENCES Products(id)
// );
async function getAllCartItems() {
  const client = await pool.connect();
  const result = await client.query("SELECT * FROM Cart");
  client.release();

  try {
    console.log("Fetched cart items:", result.rows);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.error();
  }
}

async function createCartItem(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { user_id, name, price, quantity, product_id } = body;
  try {
    const result = await client.query(
      "INSERT INTO Cart (user_id, name, price, quantity, product_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [user_id, name, price, quantity, product_id]
    );
    client.release();
    console.log("Created cart item:", result.rows[0]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating cart item:", error);
    client.release();
    return NextResponse.json(
      { error: "Error creating cart item" },
      { status: 500 }
    );
  }
}

async function deleteCartItem(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { id } = body;

  try {
    const q = "DELETE FROM Cart WHERE id = $1";
    const result = await client.query(q, [id]);
    client.release();
    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    console.log("Deleted cart item with ID:", id);
    return NextResponse.json({ message: "Cart item deleted successfully", id });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    client.release();
    return NextResponse.json(
      { error: "Error deleting cart item" },
      { status: 500 }
    );
  }
}

async function updateCartItem(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { id, name, price, quantity } = body;

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
    if (quantity) {
      fields.push(`quantity = $${index++}`);
      values.push(quantity);
    }

    values.push(id);

    const query = `UPDATE Cart SET ${fields.join(
      ", "
    )} WHERE id = $${index} RETURNING *`;

    const result = await client.query(query, values);
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    console.log("Updated cart item:", result.rows[0]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { error: "Error updating cart item" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return getAllCartItems();
}

export async function POST(request: NextRequest) {
  return createCartItem(request);
}

export async function DELETE(request: NextRequest) {
  return deleteCartItem(request);
}

export async function PUT(request: NextRequest) {
  return updateCartItem(request);
}
