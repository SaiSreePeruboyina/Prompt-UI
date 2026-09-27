// /app/api/projects/route.js
import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = "promptui"; // change if needed

async function getDb() {
  if (!client.topology?.isConnected()) await client.connect();
  return client.db(dbName).collection("projects");
}

export async function GET() {
  const collection = await getDb();
  const projects = await collection.find().toArray();
  return NextResponse.json(projects);
}

export async function POST(req) {
  const collection = await getDb();
  const data = await req.json();
  const result = await collection.insertOne(data);
  return NextResponse.json({ ...data, _id: result.insertedId });
}

export async function DELETE(req) {
  const collection = await getDb();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

  await collection.deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ deleted: true });
}
