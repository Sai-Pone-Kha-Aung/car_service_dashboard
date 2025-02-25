import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

async function getCustomerById(request: NextRequest) {
  try {
    const client = await pool.connect();
    const url = new URL(request.url);
    const customerId = url.pathname.split("/").pop();
    console.log("Request URL:", request.url);
    console.log("Extracted customerId:", customerId);

    if (customerId) {
      const result = await client.query("SELECT * FROM users WHERE id = $1", [
        customerId,
      ]);
      const carQuery = await client.query(
        "SELECT * FROM cars WHERE user_id = $1",
        [customerId]
      );
      const appointmentsQuery = await client.query(
        `SELECT a.*, s.*, aps.mechanic_id, aps.appointment_id
        FROM appointments a 
        LEFT JOIN appointmentservices aps ON a.id = aps.appointment_id 
        LEFT JOIN services s ON aps.service_id = s.id 
        WHERE a.user_id = $1`,
        [customerId]
      );

      const cartQuery = await client.query(
        "SELECT * FROM cart WHERE user_id = $1",
        [customerId]
      );
      const paymentsQuery = await client.query(
        "SELECT * FROM payments WHERE user_id = $1",
        [customerId]
      );
      const orderQuery = await client.query(
        "SELECT * FROM orders WHERE user_id = $1",
        [customerId]
      );
      const appointments = appointmentsQuery.rows;
      const userCars = carQuery.rows;
      const userCart = cartQuery.rows;
      const userPayments = paymentsQuery.rows;
      const orderJoinQuery = await client.query(
        `SELECT o.*, p.name as product_name 
         FROM orders o 
         LEFT JOIN products p ON o.product_id = p.id 
         WHERE o.user_id = $1`,
        [customerId]
      );
      const userOrders = orderJoinQuery.rows;

      client.release();

      const user = result.rows[0];

      if (user.avatar) {
        user.avatar = `data:image/jpeg;base64,${user.avatar.toString(
          "base64"
        )}`;
      }

      if (result.rows.length > 0) {
        return NextResponse.json({
          ...result.rows[0],
          cars: userCars,
          appointments: appointments,
          cart: userCart,
          orders: userOrders,
          payments: userPayments,
        });
      }

      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    client.release();

    return NextResponse.json(
      { error: "Customer ID is required" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function updateCustomerById(request: NextRequest) {
  const client = await pool.connect();
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const body = await request.json();
    const { name, email, phone, address, password, avatar } = body;

    const fields = [];
    const values = [];
    let index = 1;

    if (name) {
      fields.push(`name = $${index++}`);
      values.push(name);
    }
    if (email) {
      fields.push(`email = $${index++}`);
      values.push(email);
    }
    if (phone) {
      fields.push(`phone = $${index++}`);
      values.push(phone);
    }
    if (address) {
      fields.push(`address = $${index++}`);
      values.push(address);
    }
    if (password) {
      fields.push(`password = $${index++}`);
      values.push(password);
    }
    if (avatar) {
      fields.push(`avatar = $${index++}`);
      values.push(avatar);
    }

    fields.push(`updatedat = $${index++}`);
    values.push(new Date());
    values.push(id);

    const query = `UPDATE users SET ${fields.join(
      ", "
    )} WHERE id = $${index} RETURNING *`;

    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    console.log("Updated customer:", result.rows[0]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating customer:", error);
    return NextResponse.json(
      { error: "Error updating customer" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

export async function GET(request: NextRequest) {
  return getCustomerById(request);
}

export async function PUT(request: NextRequest) {
  return updateCustomerById(request);
}

export async function PATCH(request: NextRequest) {
  const client = await pool.connect();
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const formData = await request.formData();
    const file = formData.get("avatar") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const query = `UPDATE users SET avatar = $1::bytea, updatedat = $2 WHERE id = $3 RETURNING *`;
    const result = await client.query(query, [buffer, new Date(), id]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Avatar updated successfully" });
  } catch (error) {
    console.error("Error uploading avatar:", error);
    return NextResponse.json(
      { error: "Error uploading avatar" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
