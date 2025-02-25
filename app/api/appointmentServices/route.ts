import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

async function getAllAppointmentServices() {
  const client = await pool.connect();
  try {
    const query = `
      SELECT 
        aps.appointment_id, 
        aps.service_id, 
        aps.mechanic_id,
        a.name AS appointment_name,
        a.car AS appointment_car,
        a.date AS appointment_date,
        a.status AS appointment_status,
        a.time AS appointment_time,
        s.name AS service_name,
        s.price AS service_price,
        st.name AS mechanic_name,
        st.role AS mechanic_role,
        st.email AS mechanic_email,
         u.name AS user_name
      FROM 
        AppointmentServices aps
      JOIN 
        Appointments a ON aps.appointment_id = a.id
      JOIN 
        Services s ON aps.service_id = s.id
      JOIN 
        Staff st ON aps.mechanic_id = st.id
      JOIN
        Users u ON a.user_id = u.id
    `;
    const result = await client.query(query);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching appointment services:", error);
    return NextResponse.json(
      { error: "Error fetching appointment services" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

async function createAppointmentService(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { appointment_id, service_id, mechanic_id } = body;

  try {
    const result = await client.query(
      "INSERT INTO AppointmentServices (appointment_id, service_id, mechanic_id) VALUES ($1, $2, $3) RETURNING *",
      [appointment_id, service_id, mechanic_id]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating appointment service:", error);
    return NextResponse.json(
      { error: "Error creating appointment service" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

async function deleteAppointmentService(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { appointment_id, service_id, mechanic_id } = body;

  try {
    const result = await client.query(
      "DELETE FROM AppointmentServices WHERE appointment_id = $1 AND service_id = $2 AND mechanic_id = $3 RETURNING *",
      [appointment_id, service_id, mechanic_id]
    );
    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Appointment service not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Appointment service deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting appointment service:", error);
    return NextResponse.json(
      { error: "Error deleting appointment service" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

async function updateAppointmentService(request: NextRequest) {
  const client = await pool.connect();
  const body = await request.json();
  const { appointment_id, service_id, mechanic_id, new_mechanic_id } = body;

  try {
    const result = await client.query(
      "UPDATE AppointmentServices SET mechanic_id = $1 WHERE appointment_id = $2 AND service_id = $3 AND mechanic_id = $4 RETURNING *",
      [new_mechanic_id, appointment_id, service_id, mechanic_id]
    );
    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Appointment service not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating appointment service:", error);
    return NextResponse.json(
      { error: "Error updating appointment service" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

export async function GET(request: NextRequest) {
  return getAllAppointmentServices();
}

export async function POST(request: NextRequest) {
  return createAppointmentService(request);
}

export async function DELETE(request: NextRequest) {
  return deleteAppointmentService(request);
}

export async function PUT(request: NextRequest) {
  return updateAppointmentService(request);
}
