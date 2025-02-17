import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

async function getAllProdcuts() {
  const client = await pool.connect();
  const result = await client.query("SELECT * FROM products");
  client.release();

  try {
    console.log("Fetched products:", result.rows);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.error();
  }
}

// name VARCHAR(255),
// quantity INT,
// reorder INT,
// price DECIMAL(10, 2),
// serviceId INT,
// image VARCHAR(255),
// description TEXT

async function createProduct(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { name, quantity, reorder, price, serviceId, image, description } =
    body;
  try {
    const result = await client.query(
      "INSERT INTO products (name, quantity, reorder, price, serviceId, image, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [name, quantity, reorder, price, serviceId, image, description]
    );
    client.release();
    console.log("Created product:", result.rows[0]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Error creating product" },
      { status: 500 }
    );
  }
}

async function deleteProduct(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { id } = body;

  try {
    const q = "DELETE FROM products WHERE id = $1";
    const result = await client.query(q, [id]);
    client.release();

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    console.log("Deleted product with ID:", id);
    return NextResponse.json({ message: "Product deleted successfully", id });
  } catch (error) {
    console.error("Error deleting product:", error);
    client.release();
    return NextResponse.json(
      { error: "Error deleting product" },
      { status: 500 }
    );
  }
}

async function updateProduct(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { id, name, quantity, reorder, price, serviceId, image, description } =
    body;

  try {
    const fields = [];
    const values = [];
    let index = 1;

    if (name) {
      fields.push(`name = $${index++}`);
      values.push(name);
    }
    if (quantity) {
      fields.push(`quantity = $${index++}`);
      values.push(quantity);
    }
    if (reorder) {
      fields.push(`reorder = $${index++}`);
      values.push(reorder);
    }
    if (price) {
      fields.push(`price = $${index++}`);
      values.push(price);
    }
    if (serviceId) {
      fields.push(`serviceId) { = $${index++}`);
      values.push(serviceId);
    }
    if (image) {
      fields.push(`image = $${index++}`);
      values.push(image);
    }
    if (description) {
      fields.push(`description = $${index++}`);
      values.push(description);
    }
    values.push(id);

    const query = `UPDATE products SET ${fields.join(
      ", "
    )} WHERE id = $${index} RETURNING *`;

    const result = await client.query(query, values);
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    console.log("Updated product:", result.rows[0]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Error updating product" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return getAllProdcuts();
}

export async function POST(request: NextRequest) {
  return createProduct(request);
}

export async function DELETE(request: NextRequest) {
  return deleteProduct(request);
}

export async function PUT(request: NextRequest) {
  return updateProduct(request);
}
