import { MongoClient } from "mongodb";
const mongoURL = process.env.MONGO!;
export async function connectDB() {
  const client = await MongoClient.connect(mongoURL);
  return client;
}

export async function getDatabase(client: MongoClient) {
  const db = client.db("my-events");
  return db;
}
