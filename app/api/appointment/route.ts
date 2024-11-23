import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const [rows] = await pool.query("SELECT * FROM Appointments");

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json(
        { message: "No appointments found" },
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
      "INSERT INTO Appointments (customer_id, car, service, date ,status) VALUES ( ?, ?, ?, ?, ?, ?)";
    const body = await request.json();
    console.log("Request body:", body);

    const appointment: Appointment = {
      id: body[0].id,
      customer_id: body[0].customer_id,
      car: body[0].car,
      service: body[0].service,
      date: body[0].date,
      status: body[0].status,
    };

    console.log(
      "Parsed values:",
      appointment.id,
      appointment.customer_id,
      appointment.car,
      appointment.service,
      appointment.date,
      appointment.status
    );

    await pool.query(q, [
      appointment.customer_id,
      appointment.car,
      appointment.service,
      appointment.date,
      appointment.status,
    ]);
    return NextResponse.json({ message: "Appointment added" }, { status: 201 });
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
      "UPDATE Appointments SET customer_id = ?, car = ?, service = ?, date = ?, status = ? WHERE id = ?";
    const body = await request.json();
    console.log("Request body:", body);

    const appointment: Appointment = {
      id: body[0].id,
      customer_id: body[0].customer_id,
      car: body[0].car,
      service: body[0].service,
      date: new Date(body[0].date).toISOString().split("T")[0],
      status: body[0].status,
    };

    console.log("Parsed values:", appointment.id);
    if (!appointment.id) {
      return NextResponse.json({ error: "Please provide id" }, { status: 400 });
    }
    await pool.query(q, [
      appointment.customer_id,
      appointment.car,
      appointment.service,
      appointment.date,
      appointment.status,
      appointment.id,
    ]);
    return NextResponse.json(
      { message: "Appointment updated" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Put", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const q = "DELETE FROM Appointments WHERE id = ?";

    const body = await request.json();
    console.log("Request body:", body);

    const appointment: Appointment = {
      id: body[0].id,
      customer_id: body[0].customer_id,
      car: body[0].car,
      service: body[0].service,
      date: body[0].date,
      status: body[0].status,
    };
    console.log("Parsed values:", appointment.id);
    if (!appointment.id) {
      console.log("Missing appointmentId");
      return NextResponse.json({ error: "Please provide id" }, { status: 400 });
    }
    await pool.query(q, [appointment.id]);
    return NextResponse.json(
      { message: "Appointment deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
