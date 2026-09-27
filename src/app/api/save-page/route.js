// import clientPromise from "@/lib/mongodb";

// export async function POST(request) {
//   try {
//     const client = await clientPromise;
//     const db = client.db("test"); 
//     const { title } = await request.json();

//     const result = await db.collection("pages").insertOne({
//       title,
//       createdAt: new Date(),
//     });

//     return new Response(JSON.stringify({ savedPage: { id: result.insertedId, title } }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     console.error("Save Page Error:", err);
//     return new Response(JSON.stringify({ error: "Failed to save page" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
// /api/save-page/route.js
// import clientPromise from "@/lib/mongodb";
// import { ObjectId } from "mongodb";

// export async function POST(request) {
//   const client = await clientPromise;
//   const db = client.db("test");
//   const { projectId, pageName, code } = await request.json();

//   const collectionName = `project_${projectId}`;

//   // Save page document inside project's collection
//   const result = await db.collection(collectionName).insertOne({
//     pageName,
//     code,
//     savedAt: new Date(),
//   });

//   // Optionally update lastEdited field in project
//   await db.collection("projects").updateOne(
//     { _id: new ObjectId(projectId) },
//     { $set: { lastEdited: new Date() } }
//   );

//   return new Response(
//     JSON.stringify({ message: "Page saved", pageId: result.insertedId }),
//     { status: 200 }
//   );
// }
// /api/save-page/route.js
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db("test");

  const { pageName, code } = await request.json();

  if (!pageName) {
    return new Response(
      JSON.stringify({ error: "Page name is required" }),
      { status: 400 }
    );
  }

  // Find last created project (sort descending by createdAt)
  const lastProject = await db
    .collection("projects")
    .find()
    .sort({ createdAt: -1 })
    .limit(1)
    .toArray();

  if (!lastProject.length) {
    return new Response(
      JSON.stringify({ error: "No project found to save page into" }),
      { status: 404 }
    );
  }

  const projectId = lastProject[0]._id.toString();
  const projectCollectionName = `project_${projectId}`;

  // Insert the page into that project's collection
  const pageDoc = {
    pageName,
    code,
    createdAt: new Date(),
    lastEdited: new Date(),
  };

  const insertResult = await db
    .collection(projectCollectionName)
    .insertOne(pageDoc);

  return new Response(
    JSON.stringify({ pageId: insertResult.insertedId.toString() }),
    { status: 200 }
  );
}
