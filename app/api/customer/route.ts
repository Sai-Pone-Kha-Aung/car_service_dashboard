import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  cars: Car[];
  appointment: Appointment[];
}

async function getCustomerById(customer: Customer) {
  const { id } = customer;
  const q = "SELECT * FROM Customers WHERE id = ?";
  const [rows] = await pool.query(q, [id]);

  if (!id) {
    return NextResponse.json(
      { error: "Please provide customerID" },
      { status: 400 }
    );
  }

  if (!Array.isArray(rows) || rows.length === 0) {
    return NextResponse.json(
      { message: "No customers found" },
      { status: 404 }
    );
  }

  const customerData: Customer = rows[0] as Customer;

  const [appointmentRows] = await pool.query(
    "SELECT * FROM Appointments WHERE customer_id = ?",
    [id]
  );

  const [carRows] = await pool.query(
    "SELECT * FROM Cars WHERE customer_id = ?",
    [id]
  );

  customerData.cars = carRows as Car[];
  customerData.appointment = appointmentRows as Appointment[];

  return NextResponse.json(rows, { status: 200 });
}

async function getAllCustomers() {
  const [rows] = await pool.query("SELECT * FROM Customers");

  if (!Array.isArray(rows) || rows.length === 0) {
    return NextResponse.json(
      { message: "No customers found" },
      { status: 404 }
    );
  }

  return NextResponse.json(rows, { status: 200 });
}

export async function GET(request: NextRequest) {
  try {
    const getID = request.nextUrl.searchParams.get("id");
    const id = getID ? parseInt(getID) : null;
    console.log("Customer ID:", id);

    if (id !== null) {
      const customer: Customer = {
        id,
        name: "",
        phone: "",
        email: "",
        address: "",
        cars: [],
        appointment: [],
      };
      return await getCustomerById(customer);
    }

    if (id === "") {
      return NextResponse.json(
        { error: "Please provide customerID" },
        { status: 400 }
      );
    }

    return await getAllCustomers();
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
      "INSERT INTO Customers (name, phone, email, address) VALUES (?, ?, ?, ?)";
    const body = await request.json();
    console.log("Request body:", body);

    const customer: Customer = {
      id: body[0].id,
      name: body[0].name,
      phone: body[0].phone,
      email: body[0].email,
      address: body[0].address,
      cars: [],
      appointment: [],
    };
    console.log("Parsed values:", customer.name, customer.phone);

    if (
      !customer.name ||
      !customer.phone ||
      !customer.email ||
      !customer.address
    ) {
      console.log("Missing customerName or customerPhone");
      return NextResponse.json(
        { error: "Please provide customerName and customerPhone" },
        { status: 400 }
      );
    }
    await pool.query(q, [
      customer.name,
      customer.phone,
      customer.email,
      customer.address,
    ]);

    console.log(
      "Inserted values:",
      customer.name,
      customer.phone,
      customer.email,
      customer.address
    );

    return NextResponse.json({ message: "Customer added" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const q = "DELETE FROM Customers WHERE id = ?";
    const body = await request.json();
    console.log("Request body:", body);

    const customer: Customer = {
      id: body[0].id,
      name: "",
      phone: "",
      email: "",
      address: "",
      cars: [],
      appointment: [],
    };

    console.log("Parsed values:", customer.id);

    if (!customer.id) {
      console.log("Missing customerId");
      return NextResponse.json({ error: "Please provide id" }, { status: 400 });
    }

    await pool.query(q, [customer.id]);
    console.log("Deleted values:", customer.id);

    return NextResponse.json({ message: "Customer deleted" }, { status: 200 });
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
      "UPDATE Customers SET name = ?, phone = ?, email = ?, address = ? WHERE id = ?";
    const body = await request.json();
    console.log("Request body:", body);

    const { id, name, phone, email, address } = body[0];
    console.log("Parsed values:", id, name, phone, email, address);

    if (!id || !name || !phone || !email || !address) {
      console.log("Missing id, name, phone, email, address");
      return NextResponse.json(
        { error: "Please provide id, name, phone, email, address" },
        { status: 400 }
      );
    }

    await pool.query(q, [name, phone, email, address, id]);
    console.log("Updated values:", id, name, phone, email, address);
    return NextResponse.json({ message: "Customer updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
