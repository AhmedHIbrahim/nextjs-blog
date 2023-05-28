import { hashPassword } from "@/lib/auth";
import { verifyPassword } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") return;

  const session = await getServerSession(req, res, authOptions);

  console.log(session);
  if (!session) {
    res.status(401).json({ message: "NOT AUTHANTICATED!" });
    return;
  }

  const client = await connectToDatabase();
  const collection = client.db().collection("users");

  const userEmail = session.user?.email;

  const user = await collection.findOne({ email: userEmail });

  if (!user) {
    res.status(401).json({ message: "USER NOT FOUND!" });
    client.close();
    return;
  }

  const oldPassword = req.body.oldPassword;
  const passwordsAreEqual = await verifyPassword(oldPassword, user.password);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Invalid Password!" });
    client.close();
    return;
  }

  const newPassword = req.body.newPassword;
  const hashedPassword = await hashPassword(newPassword);
  const result = await collection.updateOne(
    { email: userEmail },
    {
      $set: {
        password: hashedPassword,
      },
    }
  );

  client.close();
  res.status(201).json({ message: "Password is updated!" });
}
export default handler;
