import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import QuizApi from "../../services/QuizApi";
import { IQuiz } from "../../types/quiz.type";
import QuizCard from "../QuizCard/QuizCard";

function QuizList() {
  const { getRandomQuizzes } = QuizApi();
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);

  useEffect(() => {
    getRandomQuizzes()
      .then((data) => setQuizzes(data))
      .catch((error) => console.log(error));
  }, []);

  console.log(quizzes);

  return (
    <Flex p="10" flexDirection="column" alignItems="center" gap="20">
      {quizzes.map((quizItem) => (
        <QuizCard quiz={quizItem} key={uuidv4()} />
      ))}
    </Flex>
  );
}

export default QuizList;
