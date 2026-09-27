// src/app/api/insert/route.js
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("test"); // or your DB name
    const body = await request.json();

    const result = await db.collection("users").insertOne(body);

    return new Response(JSON.stringify({ message: "Data inserted", result }), {
      status: 200,
    });
  } catch (error) {
    console.error("Insert error:", error);
    return new Response(JSON.stringify({ error: "Insert failed" }), {
      status: 500,
    });
  }
}
