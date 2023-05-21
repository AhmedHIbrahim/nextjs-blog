// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

type Data = {
  name: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, name, message } = JSON.parse(req.body);

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input" });
      return;
    }

    let newMessage = {
      email,
      name,
      message,
    };

    let client;
    try {
      const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.cicyz.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: "Couldn't connect to database" });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection("blog").insertOne(newMessage);
      newMessage = Object.assign(
        {
          id: result.insertedId,
        },
        newMessage
      );
    } catch (error) {
      client.close();
      res.status(403).json({ message: "Couldn't connect to database" });
      return;
    }

    client.close();
    res
      .status(201)
      .json({ message: "Successfully stored message!", payload: newMessage });
    return;
  }
  res.status(200).json({ name: "John Doe" });
}

export default handler;
