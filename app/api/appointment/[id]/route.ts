import { NextResponse, NextRequest } from "next/server";
import pool from "@/lib/db";

async function getAppointmetById(request: NextRequest) {
  const appointmentId = request.nextUrl.searchParams.get("id");
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM appointments WHERE id = $1",
      [appointmentId]
    );
    const [appointment] = result.rows.map((row) => ({
      ...row,
      service: JSON.parse(row.service.replace(/\\/g, "")),
    }));
    console.log("Fetched appointment:", appointment);
    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return NextResponse.error();
  } finally {
    client.release();
  }
}

export async function GET(request: NextRequest) {
  return getAppointmetById(request);
}
