// pages/api/quiz/[id].ts
import { PrismaClient } from "@prisma/client";
import { createQuestion } from "./index";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { text, answer, quizId } = req.body;

    if (!text || answer === undefined || !quizId) {
      res.status(400).json({ error: "Invalid request parameters" });
      return;
    }

    try {
      await createQuestion(text, answer, quizId);
      res.status(201).json({ message: "Question created successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ error: "Invalid request method" });
  }
}
