import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// CREATE TABLE Appointments (
//     id INT PRIMARY KEY,
//     user_id INT,
//     name VARCHAR(255),
//     car VARCHAR(255),
//     service VARCHAR(255),
//     date DATE,
//     status VARCHAR(50),
//     FOREIGN KEY (user_id) REFERENCES Users(id)
// );

async function getAllAppointments() {
  const client = await pool.connect();
  const result = await client.query("SELECT * FROM Appointments");
  client.release();

  try {
    console.log("Fetched appointments:", result.rows);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.error();
  }
}

async function createAppointment(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { user_id, name, car, service, date, status } = body;

  try {
    const result = await client.query(
      "INSERT INTO Appointments (user_id, name, car, service, date, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [user_id, name, car, service, date, status]
    );
    client.release();
    console.log("Created appointment:", result.rows[0]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Error creating appointment" },
      { status: 500 }
    );
  }
}

async function deleteAppointment(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { id } = body;

  try {
    const q = "DELETE FROM Appointments WHERE id = $1";
    const result = await client.query(q, [id]);
    client.release();

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    console.log("Deleted appointment with ID:", id);
    return NextResponse.json({
      message: "Appointment deleted successfully",
      id,
    });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    client.release();
    return NextResponse.json(
      { error: "Error deleting appointment" },
      { status: 500 }
    );
  }
}

async function updateAppointment(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { id, user_id, name, car, service, date, status } = body;

  try {
    const fields = [];
    const values = [];
    let index = 1;

    if (user_id) {
      fields.push(`user_id = $${index++}`);
      values.push(user_id);
    }
    if (name) {
      fields.push(`name = $${index++}`);
      values.push(name);
    }
    if (car) {
      fields.push(`car = $${index++}`);
      values.push(car);
    }
    if (service) {
      fields.push(`service = $${index++}`);
      values.push(service);
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

    const query = `UPDATE Appointments SET ${fields.join(
      ", "
    )} WHERE id = $${index} RETURNING *`;

    const result = await client.query(query, values);
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    console.log("Updated appointment:", result.rows[0]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating appointment:", error);
    client.release();
    return NextResponse.json(
      { error: "Error updating appointment" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return getAllAppointments();
}

export async function POST(request: NextRequest) {
  return createAppointment(request);
}

export async function DELETE(request: NextRequest) {
  return deleteAppointment(request);
}

export async function PUT(request: NextRequest) {
  return updateAppointment(request);
}
