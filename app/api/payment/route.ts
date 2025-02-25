import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

async function getAllPayments() {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM Payments");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { error: "Error fetching payments" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

async function createPayment(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { paymentID, orderID, amount, paymentDate, paymentStatus, user_id } =
    body;

  try {
    const result = await client.query(
      "INSERT INTO Payments (paymentID, orderID, amount, paymentDate, paymentStatus, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [paymentID, orderID, amount, paymentDate, paymentStatus, user_id]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating payment:", error);
    return NextResponse.json(
      { error: "Error creating payment" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

async function deletePayment(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { paymentID } = body;

  try {
    const result = await client.query(
      "DELETE FROM Payments WHERE paymentID = $1 RETURNING *",
      [paymentID]
    );
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.error("Error deleting payment:", error);
    return NextResponse.json(
      { error: "Error deleting payment" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

async function updatePayment(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { paymentID, orderID, amount, paymentDate, paymentStatus } = body;

  try {
    const result = await client.query(
      "UPDATE Payments SET orderID = $1, amount = $2, paymentDate = $3, paymentStatus = $4 WHERE paymentID = $5 RETURNING *",
      [orderID, amount, paymentDate, paymentStatus, paymentID]
    );
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating payment:", error);
    return NextResponse.json(
      { error: "Error updating payment" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

export async function GET(request: NextRequest) {
  return getAllPayments();
}

export async function POST(request: NextRequest) {
  return createPayment(request);
}

export async function DELETE(request: NextRequest) {
  return deletePayment(request);
}

export async function PUT(request: NextRequest) {
  return updatePayment(request);
}
