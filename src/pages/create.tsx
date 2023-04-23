import React from "react";
import Link from "next/link";
import { useState } from "react";
import { Layout } from "./components/Layout";

import {
  createQuizHelper,
  createQuestionHelper,
} from "../utils/apiHelpers";

type QuestionAnswers = {
  [key: string]: {
    name: string;
    answer: boolean;
  };
};

const create = () => {
  const [name, setName] = useState("");

  const questionFactory = (name: string, answer: boolean) => {
    return {
      name: name,
      answer: answer,
    };
  };

  const [questions, setQuestions] = useState({
    question1: questionFactory("", false),
    question2: questionFactory("", false),
    question3: questionFactory("", false),
  });


  //   createQuestion(text: string, answer: boolean, quizId: number)
  //   createQuiz(name : string)

  function redirectToHomepage() {
    window.location.href = '/';
  }

  const handleCreateQuizAndQuestion = async (
    name: string,
    questions: QuestionAnswers
  ) => {
    const quizId = await createQuizHelper(name);

    console.log(questions);

    const createAllQuestions = async (
      questions: QuestionAnswers,
      quizId: number
    ) => {
      for (const [key, value] of Object.entries(questions))  {
        console.log(value.name, value.answer, quizId);
        await createQuestionHelper(value.name, value.answer, quizId);
      };
    };
    await createAllQuestions(questions, quizId);

    redirectToHomepage()

  };



  return (
    <Layout>
      <div className="w-full flex justify-center">
        <Link href="/">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            Return to Homepage
          </button>
        </Link>
      </div>

      <h1 className="font-heading text-3xl font-bold mb-6">Create a Quiz</h1>
      <form>
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-300 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="border text-gray-900 rounded-lg py-2 px-3 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="question1"
            className="block text-gray-300 font-bold mb-2"
          >
            Question 1
          </label>
          <input
            type="text"
            id="question1"
            className="border border-gray-900 rounded-lg py-2 px-3 w-full mb-2"
            value={questions.question1.name}
            onChange={(e) =>
              setQuestions({
                ...questions,
                question1: { ...questions.question1, ["name"]: e.target.value },
              })
            }
            required
          />
          <label htmlFor="answer1" className="inline-flex items-center">
            <input
              type="radio"
              id="answer1"
              className="form-radio h-5 w-5 text-gray-600"
              checked={questions.question1.answer}
              onChange={() =>
                setQuestions({
                  ...questions,
                  question1: { ...questions.question1, ["answer"]: true },
                })
              }
              required
            />
            <span className="ml-2 text-gray-300">True</span>
          </label>
          <label htmlFor="answer2" className="inline-flex items-center ml-6">
            <input
              type="radio"
              id="answer2"
              className="form-radio h-5 w-5 text-gray-600"
              checked={!questions.question1.answer}
              onChange={() =>
                setQuestions({
                  ...questions,
                  question1: { ...questions.question1, ["answer"]: false },
                })
              }
            />
            <span className="ml-2 text-gray-300">False</span>
          </label>
        </div>

        <div className="mb-6">
          <label
            htmlFor="question2"
            className="block text-gray-300 font-bold mb-2"
          >
            Question 2
          </label>
          <input
            type="text"
            id="question2"
            className="border border-gray-900 rounded-lg py-2 px-3 w-full mb-2"
            value={questions.question2.name}
            onChange={(e) =>
              setQuestions({
                ...questions,
                question2: { ...questions.question2, ["name"]: e.target.value },
              })
            }
            required
          />
          <label htmlFor="answer3" className="inline-flex items-center">
            <input
              type="radio"
              id="answer3"
              className="form-radio h-5 w-5 text-gray-900"
              checked={questions.question2.answer}
              onChange={() =>
                setQuestions({
                  ...questions,
                  question2: { ...questions.question2, ["answer"]: true },
                })
              }
              required
            />
            <span className="ml-2 text-gray-300">True</span>
          </label>
          <label htmlFor="answer4" className="inline-flex items-center ml-6">
            <input
              type="radio"
              id="answer4"
              className="form-radio h-5 w-5 text-gray-600"
              checked={!questions.question2.answer}
              onChange={() =>
                setQuestions({
                  ...questions,
                  question2: { ...questions.question2, ["answer"]: false },
                })
              }
            />
            <span className="ml-2 text-gray-300">False</span>
          </label>
        </div>

        <div className="mb-6">
          <label
            htmlFor="question3"
            className="block text-gray-300 font-bold mb-2"
          >
            Question 3
          </label>
          <input
            type="text"
            id="question3"
            className="border text-gray-900 border-gray-900 rounded-lg py-2 px-3 w-full mb-2"
            value={questions.question3.name}
            onChange={(e) =>
              setQuestions({
                ...questions,
                question3: { ...questions.question3, ["name"]: e.target.value },
              })
            }
            required
          />
          <label htmlFor="answer5" className="inline-flex items-center">
            <input
              type="radio"
              id="answer5"
              className="form-radio h-5 w-5 text-gray-600"
              checked={questions.question3.answer}
              onChange={() =>
                setQuestions({
                  ...questions,
                  question3: { ...questions.question3, ["answer"]: true },
                })
              }
              required
            />
            <span className="ml-2 text-gray-300">True</span>
          </label>
          <label htmlFor="answer6" className="inline-flex items-center ml-6">
            <input
              type="radio"
              id="answer6"
              className="form-radio h-5 w-5 text-gray-600"
              checked={!questions.question3.answer}
              onChange={() =>
                setQuestions({
                  ...questions,
                  question3: { ...questions.question3, ["answer"]: false },
                })
              }
            />
            <span className="ml-2 text-gray-300">False</span>
          </label>
        </div>
      </form>

      <button
        onClick={async () => await handleCreateQuizAndQuestion(name, questions)}
        type="submit"
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </Layout>
  );
};

export default create;
