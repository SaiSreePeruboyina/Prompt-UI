import clientPromise from "@/lib/mongodb";
import { hash } from "bcryptjs";

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("test"); // Change to your DB name
    const { fullName, username, email, password } = await request.json();

    // Check if user already exists
    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return new Response(JSON.stringify({ error: "Email already registered" }), {
        status: 400,
      });
    }
    const hashedPassword = await hash(password, 10);
    await db.collection("users").insertOne({
      fullName,
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ message: "User created" }), {
      status: 201,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
