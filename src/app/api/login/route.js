import clientPromise from "@/lib/mongodb";
import { compare } from "bcryptjs";

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("test"); 
    const { email, password } = await request.json();
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Incorrect password" }), {
        status: 401,
      });
    }
    return new Response(JSON.stringify({ message: "Login successful" }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
