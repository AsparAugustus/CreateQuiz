export async function fetchQuizzesHelper() {
  const res = await fetch("/api/quiz/fetchQuizzes");
  const quizzes = await res.json();
  return quizzes;
}

export async function fetchQuizHelper(id: string) {
  const res = await fetch(`/api/quiz/fetchQuiz?id=${id}`);
  const questions = await res.json();
  return questions;
}

export async function createQuizHelper(name: string) {
  const res = await fetch("/api/quiz/createQuiz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  const data = await res.json();
  return data.quizId;
}

export async function createQuestionHelper(
  text: string,
  answer: boolean,
  quizId: number
) {
  const res = await fetch("/api/quiz/createQuestion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, answer, quizId }),
  });

  const data = await res.json();
  return data;
}
