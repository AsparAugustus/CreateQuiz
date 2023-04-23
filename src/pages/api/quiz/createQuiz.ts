// pages/api/quiz/[id].ts
import { PrismaClient } from "@prisma/client";
import { createQuiz } from "./index";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ error: "Name is required" });
      return;
    }

    try {
      const quizId = await createQuiz(name);
      res.status(201).json({ message: "Quiz created", quizId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ error: "Invalid request method" });
  }
}
