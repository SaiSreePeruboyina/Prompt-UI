// import { MongoClient } from 'mongodb';

// const uri = process.env.MONGO_URI; // put your MongoDB connection string in .env.local
// const client = new MongoClient(uri);

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     try {
//       await client.connect();
//       const db = client.db('test');
//       const collection = db.collection('pages');

//       const { title } = req.body;
//       const result = await collection.insertOne({ title, createdAt: new Date() });

//       res.status(200).json({ savedPage: { id: result.insertedId, title } });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Failed to save' });
//     } finally {
//       await client.close();
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// }
