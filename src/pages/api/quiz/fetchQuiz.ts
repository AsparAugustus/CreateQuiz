// pages/api/quiz/[id].ts
import { PrismaClient } from "@prisma/client";
import { fetchQuiz } from "./index";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const quizId = parseInt(req.query.id);

  if (isNaN(quizId)) {
    res.status(400).json({ error: "Invalid quiz ID" });
    return;
  }

  if (req.method === "GET") {
    try {
      const quiz = await fetchQuiz(quizId);
      if (!quiz) {
        res.status(404).json({ error: "Quiz not found" });
        return;
      }
      res.status(200).json(quiz);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ error: "Invalid request method" });
  }
}
