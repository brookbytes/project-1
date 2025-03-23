import { NextResponse } from "next/server";

const users = [{ email: "admin@example.com", password: "password123" }]; // Dummy User

export async function POST(req: Request) {
  try {
    const body = await req.json(); // ✅ Correctly parsing JSON
    const { email, password } = body;

    const user = users.find((user) => user.email === email && user.password === password);

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials!" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
