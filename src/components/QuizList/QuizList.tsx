import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import QuizApi from "../../services/QuizApi";
import { IQuiz } from "../../types/quiz.type";
import GameOver from "../GameOver/GameOver";
import QuizCard from "../QuizCard/QuizCard";
import Spinner from "../Spinner/Spinner";

function QuizList() {
  const { getRandomQuizzes } = QuizApi();
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [loading, setLoading] = useState(true);

  const getQuizzes = () => {
    getRandomQuizzes()
      .then((data) => setQuizzes(data))
      .catch((error) => console.log(error));
    setLoading(false);
  };

  const pushAnswer = (answer: string) => {
    setAnswers([...answers, answer]);
  };

  const incRightAnswers = () => {
    setRightAnswers(rightAnswers + 1);
  };

  const incCurrentQuiz = () => {
    if (currentQuiz === quizzes.length - 1) {
      setIsGameOver(true);
    }
    setCurrentQuiz(currentQuiz + 1);
  };

  const restartGame = () => {
    setQuizzes([])
    setLoading(true);
    getQuizzes();
    setCurrentQuiz(0);
    setRightAnswers(0);
    setAnswers([]);
    setIsGameOver(false);
  };

  useEffect(() => {
    setLoading(true);
    getQuizzes();
  }, []);

  if (loading) {
    return (
      <Flex flexDirection="column" alignItems="center" pt="100">
        <Spinner />
      </Flex>
    );
  }

  return (
    <Flex p="10" flexDirection="column" alignItems="center" gap="5">
      {quizzes.length > 0 && currentQuiz < quizzes.length ? (
        <>
          <h2>Current issue number: {currentQuiz + 1}</h2>
          <QuizCard
            quiz={quizzes[currentQuiz]}
            key={uuidv4()}
            incRightAnswers={incRightAnswers}
            incCurrentQuiz={incCurrentQuiz}
            pushAnswer={pushAnswer}
          />
        </>
      ) : (
        ""
      )}

      {isGameOver ? (
        <GameOver
          rightAnswers={rightAnswers}
          restartGame={restartGame}
          answers={answers}
          quizzes={quizzes}
        />
      ) : (
        ""
      )}
    </Flex>
  );
}

export default QuizList;
