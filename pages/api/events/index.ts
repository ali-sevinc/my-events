import { NextApiRequest, NextApiResponse } from "next";

import { connectDB, getDatabase } from "@/helpers/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; data?: {} }>
) {
  let client;
  try {
    client = await connectDB();
  } catch (error) {
    res.status(502).json({ message: "Server not response.." });
    return;
  }
  if (req.method === "GET") {
    try {
      const db = await getDatabase(client);
      const collection = db.collection("events");
      const result = await collection.find({}).toArray();
      res.status(200).json({ message: "Success..", data: result });
    } catch (error) {
      res.status(502).json({ message: "Events could not loaded.." });
    } finally {
      client.close();
    }
  }
  if (req.method === "POST") {
    const { title, image, description, address, date } = req.body;
    if (!title || !image || !description || !address || !date) {
      res.status(422).json({ message: "Invalid values..." });
      return;
    }
    const newEvent = req.body;
    try {
      const db = await getDatabase(client);
      await db.collection("events").insertOne(newEvent);
    } catch (error) {
      res.status(502).json({ message: "Event could not inserted." });
      return;
    } finally {
      client.close();
    }
    res.status(201).json({ message: "Success..", data: newEvent });
  }
}
