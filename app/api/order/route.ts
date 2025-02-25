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
  try {
    const result = await client.query("SELECT * FROM orders");

    const productIds = result.rows.map((order) => order.product_id);
    const userIds = result.rows.map((order) => order.user_id);

    const products = await client.query(
      `SELECT * FROM products WHERE id = ANY($1)`,
      [productIds]
    );

    const payments = await client.query(
      `SELECT * FROM payments WHERE orderid = ANY($1)`,
      [result.rows.map((order) => order.id)]
    );

    const users = await client.query(`SELECT * FROM users WHERE id = ANY($1)`, [
      userIds,
    ]);

    console.log("Payments data:", payments.rows);
    console.log("Fetched orders:", result.rows);

    const serializedData = result.rows.map((order) => {
      const product = products.rows.find(
        (product) => product.id === order.product_id
      );
      const user = users.rows.find((user) => user.id === order.user_id);
      const payment = payments.rows.find(
        (payment) => payment.orderid === order.id
      );
      return {
        ...order,
        product_name: product ? product.name : "Unknown",
        user_name: user ? user.name : "Unknown",
        paymentstatus: payment ? payment.paymentstatus : "Unknown",
      };
    });
    client.release();
    return NextResponse.json(serializedData);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.error();
  }
}

async function createOrder(request: NextRequest) {
  const client = await pool.connect();
  // try {
  //   const body = await request.json();
  //   const { user_id, product_id, quantity, price, total, date, status } = body;

  //   //Check if product exists
  //   const productCheck = await client.query(
  //     "SELECT id FROM products WHERE id = $1",
  //     [product_id]
  //   );

  //   if (productCheck.rows.length === 0) {
  //     return NextResponse.json({ error: "Product not found" }, { status: 404 });
  //   }

  //   const userCheck = await client.query("SELECT id FROM users WHERE id = $1", [
  //     user_id,
  //   ]);
  //   if (userCheck.rows.length === 0) {
  //     return NextResponse.json({ error: "User not found" }, { status: 404 });
  //   }

  //   // Check stock availability
  //   const stockCheck = await client.query(
  //     "SELECT quantity FROM products WHERE id = $1",
  //     [product_id]
  //   );

  //   if (stockCheck.rows[0].quantity < quantity) {
  //     return NextResponse.json(
  //       { error: "Insufficient stock available" },
  //       { status: 400 }
  //     );
  //   }

  //   // Update product stock
  //   await client.query(
  //     "UPDATE products SET quantity = quantity - $1 WHERE id = $2",
  //     [quantity, product_id]
  //   );

  //   const result = await client.query(
  //     "INSERT INTO orders (user_id, product_id, quantity, price, total, date, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
  //     [user_id, product_id, quantity, price, total, date, status]
  //   );
  //   console.log("Created order:", result.rows[0]);
  //   return NextResponse.json(result.rows[0]);
  // } catch (error) {
  //   console.error("Error creating order:", error);
  //   return NextResponse.json(
  //     { error: "Error creating order" },
  //     { status: 500 }
  //   );
  // } finally {
  //   client.release();
  // }
  try {
    const body = await request.json();
    const { user_id, items, total, date, status } = body;

    // Check if user exists
    const userCheck = await client.query("SELECT id FROM users WHERE id = $1", [
      user_id,
    ]);
    if (userCheck.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Start a transaction
    await client.query("BEGIN");

    // Check and create orders for each item
    const orderIds = [];
    for (const item of items) {
      const { product_id, quantity, price, total: itemTotal } = item;

      // Check if product exists
      const productCheck = await client.query(
        "SELECT id, quantity FROM products WHERE id = $1",
        [product_id]
      );
      if (productCheck.rows.length === 0) {
        await client.query("ROLLBACK");
        return NextResponse.json(
          { error: `Product not found: ${product_id}` },
          { status: 404 }
        );
      }

      // Check stock availability
      if (productCheck.rows[0].quantity < quantity) {
        await client.query("ROLLBACK");
        return NextResponse.json(
          { error: `Insufficient stock for product ${product_id}` },
          { status: 400 }
        );
      }

      // Update product stock
      await client.query(
        "UPDATE products SET quantity = quantity - $1 WHERE id = $2",
        [quantity, product_id]
      );

      // Insert order (once per item)
      const result = await client.query(
        "INSERT INTO orders (user_id, product_id, quantity, price, total, date, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
        [user_id, product_id, quantity, price, itemTotal, date, status]
      );
      orderIds.push(result.rows[0].id);
    }

    await client.query("COMMIT");
    await client.query("COMMIT");
    return NextResponse.json({ message: "Order created", orderIds });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Error creating order" },
      { status: 500 }
    );
  } finally {
    client.release();
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
