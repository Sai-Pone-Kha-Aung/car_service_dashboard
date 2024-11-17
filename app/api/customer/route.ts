import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

interface Customer {
  customerID: number;
  customerName: string;
  customerPhone: string;
}

async function getCustomerById(customer: Customer) {
  const { customerID } = customer;
  const [rows] = await pool.query(
    "SELECT * FROM customer WHERE customerID = ?",
    [customerID]
  );

  if (!customerID) {
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

  return NextResponse.json(rows, { status: 200 });
}

async function getAllCustomers() {
  const [rows] = await pool.query("SELECT * FROM customer");

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
    const customerID = getID ? parseInt(getID) : null;
    console.log("Customer ID:", customerID);

    if (customerID !== null) {
      const customer: Customer = {
        customerID,
        customerName: "",
        customerPhone: "",
      };
      return await getCustomerById(customer);
    }

    if (customerID === "") {
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
    const body = await request.json();
    console.log("Request body:", body);

    const customer: Customer = {
      customerID: body[0].customerID,
      customerName: body[0].customerName,
      customerPhone: body[0].customerPhone,
    };
    console.log(
      "Parsed values:",
      customer.customerName,
      customer.customerPhone
    );

    if (!customer.customerName || !customer.customerPhone) {
      console.log("Missing customerName or customerPhone");
      return NextResponse.json(
        { error: "Please provide customerName and customerPhone" },
        { status: 400 }
      );
    }
    await pool.query(
      "INSERT INTO customer (customerName, customerPhone) VALUES (?, ?)",
      [customer.customerName, customer.customerPhone]
    );

    console.log(
      "Inserted values:",
      customer.customerName,
      customer.customerPhone
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
    const body = await request.json();
    console.log("Request body:", body);

    const customer: Customer = {
      customerID: body[0].customerID,
      customerName: "",
      customerPhone: "",
    };

    console.log("Parsed values:", customer.customerID);

    if (!customer.customerID) {
      console.log("Missing customerId");
      return NextResponse.json(
        { error: "Please provide customerId" },
        { status: 400 }
      );
    }

    await pool.query("DELETE FROM customer WHERE customerID = ?", [
      customer.customerID,
    ]);
    console.log("Deleted values:", customer.customerID);

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
    const body = await request.json();
    console.log("Request body:", body);

    const { customerID, customerName, customerPhone } = body[0];
    console.log("Parsed values:", customerID, customerName, customerPhone);

    if (!customerID || !customerName || !customerPhone) {
      console.log("Missing customerID, customerName, or customerPhone");
      return NextResponse.json(
        { error: "Please provide customerID, customerName, and customerPhone" },
        { status: 400 }
      );
    }

    await pool.query(
      "UPDATE customer SET customerName = ?, customerPhone = ? WHERE customerID = ?",
      [customerName, customerPhone, customerID]
    );
    console.log("Updated values:", customerID, customerName, customerPhone);
    return NextResponse.json({ message: "Customer updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
