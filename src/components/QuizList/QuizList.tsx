import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import QuizApi from "../../services/QuizApi";
import { IQuiz } from "../../types/quiz.type";
import QuizCard from "../QuizCard/QuizCard";

function QuizList() {
  const { getRandomQuizzes } = QuizApi();
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  //   const [answers, setAnswers] = useState([]);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState(0);

  const incRightAnswers = () => {
    setRightAnswers(rightAnswers + 1);
  };

  const incCurrentQuiz = () => {
    if (currentQuiz < 19) {
      setCurrentQuiz(currentQuiz + 1);
    }
  };

  useEffect(() => {
    getRandomQuizzes()
      .then((data) => setQuizzes(data))
      .catch((error) => console.log(error));
  }, []);

  console.log(quizzes);

  return (
    <Flex p="10" flexDirection="column" alignItems="center" gap="5">
      {quizzes.length > 0 ? (
        <>
          <h2>Current quiz: {currentQuiz + 1}</h2>
          <QuizCard
            quiz={quizzes[currentQuiz]}
            key={uuidv4()}
            incRightAnswers={incRightAnswers}
            incCurrentQuiz={incCurrentQuiz}
          />{" "}
        </>
      ) : (
        ""
      )}
    </Flex>
  );
}

export default QuizList;
