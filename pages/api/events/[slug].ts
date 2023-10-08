import { NextApiRequest, NextApiResponse } from "next";

import { connectDB, getDatabase } from "@/helpers/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(402).json({ message: "Unsupported Method.." });
    return;
  }
  const { slug } = req.query;

  if (!slug) {
    res.status(422).json({ message: "Invalid query" });
    return;
  }
  let client;
  try {
    client = await connectDB();
  } catch (error) {
    res.status(502).json({ message: "Server not response.." });
    return;
  }
  try {
    const db = await getDatabase(client);
    const collection = db.collection("events");
    const event = await collection.findOne({ $eq: { id: slug } });
    if (!event) {
      client.close();
      res.status(404).json({ message: "Event not found.." });
      return;
    }
    res.status(200).json({ message: "Success", data: event });
  } catch (error) {
    res.status(502).json({ message: "Event could not loaded.." });
  } finally {
    client.close();
  }
}
