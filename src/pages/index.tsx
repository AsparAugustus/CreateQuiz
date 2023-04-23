import Head from "next/head";
import Link from "next/link";
import {
  useQuery,
  QueryClient,
  dehydrate,
  hydrate,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchQuizzesHelper } from "../utils/apiHelpers";

import { Layout } from "./components/Layout";

type Quiz = {
  id: number;
  name: string;
};

export async function getStaticProps() {
  const queryClient = new QueryClient();

  // prefetch data on the server
  const query = await queryClient.prefetchQuery(
    ["quizzes"],
    fetchQuizzesHelper
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Home() {
  const { data, isLoading } = useQuery(["quizzes"], fetchQuizzesHelper);

  if ( isLoading ) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <>
      <Layout>
        <div className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4">
            <h1 className="font-heading text-3xl font-bold mb-4 text-center text-white">
              Quizzes
            </h1>
          </div>
          <div className="p-4 text-center">
            <Link href="/create">
              <button className="button">Create Quiz</button>
            </Link>
          </div>
          <div className="p-4">
            <table className="mx-auto">
              <thead></thead>
              <tbody>
                {data.map((quiz: Quiz) => (
                  <tr key={quiz.id}>
                    <td className="border px-4 py-4min-w-full min-w-[20vw]">
                      <div className="text-white font-bold">{quiz.name}</div>
                    </td>
                    <td className="border px-4 py-4">
                      <Link href={`/quiz/${quiz.id}`}>
                        <div className="text-blue-500 hover:text-blue-800">
                          View quiz
                        </div>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
}
