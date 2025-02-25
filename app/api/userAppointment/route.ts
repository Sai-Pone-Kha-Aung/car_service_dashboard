import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

async function getUserAppointments(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("user_id");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const client = await pool.connect();

  try {
    const result = await client.query(
      `
      SELECT 
        a.id AS appointment_id,
        a.name AS appointment_name,
        a.car,
        a.date,
        a.status,
        a.time,
        s.id AS service_id,
        s.name AS service_name,
        s.price AS service_price,
        s.title AS service_title,
        s.description AS service_description,
        s.category AS service_category,
        st.id AS mechanic_id,
        st.name AS mechanic_name,
        st.role AS mechanic_role,
        st.email AS mechanic_email,
        st.avatar AS mechanic_avatar
      FROM 
        Appointments a
      JOIN 
        AppointmentServices aps ON a.id = aps.appointment_id
      JOIN 
        Services s ON aps.service_id = s.id
      JOIN 
        Staff st ON aps.mechanic_id = st.id
      WHERE 
        a.user_id = $1
      `,
      [userId]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    return NextResponse.json(
      { error: "Error fetching user appointments" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

export async function GET(request: NextRequest) {
  return getUserAppointments(request);
}
