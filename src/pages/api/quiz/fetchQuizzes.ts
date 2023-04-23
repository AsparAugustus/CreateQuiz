// pages/api/quiz/index.ts
import { PrismaClient } from "@prisma/client";
import { fetchQuizzes } from "./index";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle GET requests
  if (req.method === "GET") {
    res.status(200).json(await fetchQuizzes());
  }

  // Handle POST requests
  if (req.method === "POST") {
    res.status(400).json({ error: "Invalid request method" });
  }
}
