import { IQuiz } from "../types/quiz.type";

const apiUrl = "https://quizapi.io/api/v1/questions";
const API_KEY = import.meta.env.VITE_API_KEY;

export default function QuizApi() {
  const getRandomQuizzes = async () => {
    const res = await fetch(`${apiUrl}?apiKey=${API_KEY}&limit=1`);
    const data: IQuiz[] = await res.json();

    return data;
  };

  return {
    getRandomQuizzes,
  };
}
