import { IQuiz } from "../types/quiz.type";

const apiUrl = "https://quizapi.io/api/v1/questions";
const API_KEY = import.meta.env.VITE_API_KEY;

export default function QuizApi() {
  const getRandomQuiz = async () => {
    const res = await fetch(`${apiUrl}?apiKey=${API_KEY}&limit=1`);
    const data: IQuiz[] = await res.json();
    //
    // const res2 = await fetch("https://opentdb.com/api.php?amount=10");
    // const data2: IQuiz[] = await res2.json();
    // console.log(data2);

    return data;
  };

  return {
    getRandomQuiz,
  };
}
