// pages/api/quiz/index.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'



const prisma = new PrismaClient()



export async function fetchQuizzes() {

    try {
        const quizzes = await prisma.quiz.findMany();

        console.log(quizzes)
        return quizzes;

    } catch (err) {
        console.log(err)
    }
}

export async function fetchQuiz(id: number) {

    try {
        const quiz = await prisma.quiz.findFirst({
            where: {
                id: id
            },
            include: {
                questions: true,
            }
        })

        console.log(quiz)
        return quiz;

    } catch (err) {
        console.log(err)
    }
}


export async function createQuiz(name : string) {

    try {

        const quiz = await prisma.quiz.create({
            data: {
                name : name
            }
        })

    } catch (err) {
        console.log(err)
    }


}



export async function createQuestion(text: string, answer: boolean, quizId: number) {

    try {

        const question = await prisma.question.create({
            data: {
                text : text,
                answer: answer,
                quiz: {
                    connect: {
                        id: quizId
                    }
                }
            }
        })

        console.log(question)

    } catch (err) {
        console.log(err)
    }

    

};


export async function deleteAllData() {

    const deletedQuestions = await prisma.question.deleteMany();
    console.log(`Deleted ${deletedQuestions.count} questions`);

    const deletedQuizzes = await prisma.quiz.deleteMany();
    console.log(`Deleted ${deletedQuizzes.count} quizzes`);



}
    




(async () => {

    // await createQuestion("test?", true, 1)
    // await createQuestion("test 3?", true, 1)

    await deleteAllData()

})();



