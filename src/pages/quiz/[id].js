import { useRouter } from "next/router";
import { useState } from "react";
import { fetchQuiz, fetchQuizzes } from "../api/quiz";
import { fetchQuizHelper } from "../../utils/apiHelpers"
import Link from "next/link";
import {
  QueryClient,
  hydrate,
  dehydrate,
  useQuery,
} from "@tanstack/react-query";

import { Layout } from "../components/Layout";

export default function QuizPage(dehydratedState) {
  const queryClient = new QueryClient();
  hydrate(queryClient, dehydratedState);

  const router = useRouter();
  const { id } = router.query;

  if (!id) return

  console.log("params", id);
  const { data } = useQuery(
    [`quiz_${id}`],
    async () => {fetchQuizHelper(`${id}`)}
  );

  const quiz = data;

  console.log("show data here", data);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const [answers, setAnswers] = useState([]);

  const handleCheckboxChange = (questionIndex, answerIndex, isChecked) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = isChecked ? answerIndex : null;
    setAnswers(newAnswers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted answers:", answers);
  };

  return (
    <Layout>
      <div class="w-full flex justify-center">
        <Link href="/">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            Return to Homepage
          </button>
        </Link>
      </div>

      <div className="max-w-xl mx-auto p-6">
        {quiz ? (
          <>
            <h1 className="text-3xl font-bold mb-4">{quiz.name}</h1>

            <form onSubmit={handleSubmit}>
              <ul className="space-y-4">
                {quiz.questions.map((question, questionIndex) => (
                  <li
                    key={question.id}
                    className="border border-gray-400 p-4 rounded-md"
                  >
                    <h2 className="font-semibold mb-2">{question.text}</h2>
                    <div className="space-x-4">
                      <label>
                        <input
                          type="checkbox"
                          checked={answers[questionIndex] === 0}
                          onChange={(event) =>
                            handleCheckboxChange(
                              questionIndex,
                              0,
                              event.target.checked
                            )
                          }
                        />
                        <span className="ml-2">True</span>
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={answers[questionIndex] === 1}
                          onChange={(event) =>
                            handleCheckboxChange(
                              questionIndex,
                              1,
                              event.target.checked
                            )
                          }
                        />
                        <span className="ml-2">False</span>
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                type="submit"
                className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
          </>
        ) : (
          <p className="text-xl">Not loaded yet.</p>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const queryClient = new QueryClient();

  // prefetch data on the server

  const query = await fetchQuizzes();

  const paths = query.map((quiz) => ({ params: { id: quiz.id.toString() } }));

  console.log("paths", paths);

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const queryClient = new QueryClient();

  const id_int = parseInt(params.id);
  const id_string = params.id.toString();

  //fetch data for the selected quiz
  const question = await queryClient.prefetchQuery(
    [`quiz_${id_string}`],
    async () => fetchQuiz(id_int)
  );

  console.log("question", question);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
