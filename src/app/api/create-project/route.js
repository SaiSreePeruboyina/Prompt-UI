// import clientPromise from "@/lib/mongodb";

// export async function POST(request) {
//   const client = await clientPromise;
//   const db = client.db("test");
//   const { name } = await request.json();

//   const result = await db.collection("projects").insertOne({
//     name,
//     pages: [],
//     createdAt: new Date(),
//     lastEdited: new Date(),
//   });

//   return new Response(JSON.stringify({
//     project: { _id: result.insertedId, name, pages: [], lastEdited: new Date().toISOString() }
//   }), { status: 200 });
// }
// /api/create-project/route.js
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db("test");
  const { name } = await request.json();

  // Step 1: Create project entry in "projects" collection
  const result = await db.collection("projects").insertOne({
    name,
    pages: [],
    createdAt: new Date(),
    lastEdited: new Date(),
  });

  const projectId = result.insertedId.toString();

  // Step 2: Create a dedicated collection for the new project
  await db.createCollection(`project_${projectId}`);

  return new Response(
    JSON.stringify({
      project: {
        _id: projectId,
        name,
        pages: [],
        lastEdited: new Date().toISOString(),
      },
    }),
    { status: 200 }
  );
}