import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// export async function GET() {
//   const client = await clientPromise;
//   const db = client.db("test");
//   const projects = await db.collection("projects").find().toArray();

//   return new Response(JSON.stringify({ projects }), { status: 200 });
// }
export async function GET(req) {
  const client = await clientPromise;
  const db = client.db("test");

  const session = await getServerSession(authOptions);

  const projects = await db
    .collection("projects")
    .find({ userEmail: session?.user?.email })
    .sort({ createdAt: -1 })
    .toArray();

  return new Response(JSON.stringify({ projects }), { status: 200 });
}
