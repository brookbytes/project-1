import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.email || !body.password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const { email, password } = body;

    // Dummy authentication (Replace with real DB check)
    if (email === "admin@example.com" && password === "password123") {
      return NextResponse.json({ message: "Login successful!" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
