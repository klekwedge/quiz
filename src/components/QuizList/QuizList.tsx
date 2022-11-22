import { Flex, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import QuizApi from "../../services/QuizApi";
import { IQuiz } from "../../types/quiz.type";
import GameOver from "../GameOver/GameOver";
import ModalResult from "../GameOver/GameOver";
import QuizCard from "../QuizCard/QuizCard";

function QuizList() {
  const { getRandomQuizzes } = QuizApi();
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [rightAnswersArr, setRightAnswersArr] = useState<string[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState(0);

  const getQuizzes = () => {
    getRandomQuizzes()
      .then((data) => setQuizzes(data))
      .catch((error) => console.log(error));
  };

  const pushRightAnswersArr = (rightAnswer: string) => {
    setRightAnswersArr([...rightAnswersArr, rightAnswer]);
  };

  const incRightAnswers = () => {
    setRightAnswers(rightAnswers + 1);
  };

  const incCurrentQuiz = () => {
    console.log(currentQuiz);
    if (currentQuiz === quizzes.length - 1) {
      setIsGameOver(true);
    }
    setCurrentQuiz(currentQuiz + 1);
  };

  console.log(isGameOver);

  const restartGame = () => {
    getQuizzes();
    setCurrentQuiz(0);
    setRightAnswers(0);
    setRightAnswersArr([]);
    setIsGameOver(false);
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  return (
    <Flex p="10" flexDirection="column" alignItems="center" gap="5">
      {quizzes.length > 0 && currentQuiz < quizzes.length ? (
        <>
          <h2>Current quiz: {currentQuiz + 1}</h2>
          <QuizCard
            quiz={quizzes[currentQuiz]}
            key={uuidv4()}
            incRightAnswers={incRightAnswers}
            incCurrentQuiz={incCurrentQuiz}
            pushRightAnswersArr={pushRightAnswersArr}
          />
        </>
      ) : (
        ""
      )}

      {isGameOver ? (
        <GameOver
          rightAnswers={rightAnswers}
          restartGame={restartGame}
          rightAnswersArr={rightAnswersArr}
          quizzes={quizzes}
        />
      ) : (
        ""
      )}
    </Flex>
  );
}

export default QuizList;
