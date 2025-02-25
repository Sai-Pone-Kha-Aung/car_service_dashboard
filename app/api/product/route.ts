import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

async function getAllProdcuts() {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM products");
    client.release();
    if (result.rows.length > 0) {
      const products = result.rows.map((product) => {
        if (product.image) {
          product.image = `data:image/jpeg;base64,${product.image.toString(
            "base64"
          )}`;
        }
        return product;
      });
      console.log("Fetched products:", products);
      return NextResponse.json(products);
    }

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
  const formData = await request.formData();
  const client = await pool.connect();

  try {
    const name = formData.get("name");
    const quantity = formData.get("quantity");
    const reorder = formData.get("reorder");
    const category = formData.get("category");
    const price = formData.get("price");
    const serverid = formData.get("serviceid");
    const description = formData.get("description");
    const imageFile = formData.get("image") as File;

    let imageBuffer = null;
    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      imageBuffer = Buffer.from(bytes);
    }

    const result = await client.query(
      "INSERT INTO products (name, quantity, reorder, category, price, serviceId, image, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        name,
        quantity,
        reorder,
        category,
        price,
        serverid,
        imageBuffer,
        description,
      ]
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
  const formData = await request.formData();
  const client = await pool.connect();

  try {
    const id = formData.get("id");
    const name = formData.get("name");
    const quantity = formData.get("quantity");
    const reorder = formData.get("reorder");
    const price = formData.get("price");
    const category = formData.get("category");
    const serviceId = formData.get("serviceid");
    const imageFile = formData.get("image") as File;
    const description = formData.get("description");

    let imageBuffer = null;
    if (imageFile && imageFile.size > 0) {
      // Check if imageFile is valid
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
    if (category) {
      fields.push(`category = $${index++}`);
      values.push(category);
    }
    if (serviceId) {
      fields.push(`serviceId = $${index++}`);
      values.push(serviceId);
    }
    if (imageBuffer) {
      // Use imageBuffer instead of imageFile to ensure buffer exists
      fields.push(`image = $${index++}`);
      values.push(imageBuffer);
    }
    if (description) {
      fields.push(`description = $${index++}`);
      values.push(description);
    }

    // Check if there are any fields to update
    if (fields.length === 0) {
      client.release();
      return NextResponse.json(
        { error: "No fields provided for update" },
        { status: 400 }
      );
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
    client.release(); // Ensure client is released on error
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
