import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

async function getAllCustomers() {
  const client = await pool.connect();
  const result = await client.query("SELECT * FROM users");
  client.release();

  try {
    console.log("Fetched customers:", result.rows);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.error();
  }
}

async function createCustomer(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { name, email, phone, address, password, avatar } = body;
  try {
    const result = await client.query(
      "INSERT INTO users (name, email, phone, address, password, avatar, createdat, updatedat) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [name, email, phone, address, password, avatar, new Date(), new Date()]
    );
    client.release();
    console.log("Created customer:", result.rows[0]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json(
      { error: "Error creating customer" },
      { status: 500 }
    );
  }
}

async function deleteCustomer(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { id } = body;

  try {
    const q = "DELETE FROM users WHERE id = $1";
    const result = await client.query(q, [id]);
    client.release();
    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    console.log("Deleted customer with ID:", id);
    return NextResponse.json({ message: "Customer deleted successfully", id });
  } catch (error) {
    console.error("Error deleting customer:", error);
    client.release();
    return NextResponse.json(
      { error: "Error deleting customer" },
      { status: 500 }
    );
  }
}

async function updateCustomer(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { id, name, email, phone, address, password, avatar } = body;

  try {
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
    client.release();

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
  }
}

export async function GET(request: NextRequest) {
  return getAllCustomers();
}

export async function POST(request: NextRequest) {
  return createCustomer(request);
}

export async function DELETE(request: NextRequest) {
  return deleteCustomer(request);
}

export async function PUT(request: NextRequest) {
  return updateCustomer(request);
}
