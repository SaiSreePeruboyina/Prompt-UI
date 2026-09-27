import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const client = await clientPromise;
  const db = client.db("test");

  await db.collection("projects").deleteOne({ _id: new ObjectId(id) });

  return new Response(JSON.stringify({ message: "Deleted" }), { status: 200 });
}
