import { Flex, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import QuizApi from "../../services/QuizApi";
import { IQuiz } from "../../types/quiz.type";
import ModalResult from "../ModalResult/ModalResult";
import QuizCard from "../QuizCard/QuizCard";

function QuizList() {
  const { getRandomQuizzes } = QuizApi();
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const incRightAnswers = () => {
    setRightAnswers(rightAnswers + 1);
  };

  const incCurrentQuiz = () => {
    setCurrentQuiz(currentQuiz + 1);
    if (currentQuiz < 19) {
      onOpen();
    }
  };


  useEffect(() => {
    getRandomQuizzes()
      .then((data) => setQuizzes(data))
      .catch((error) => console.log(error));
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
          />
        </>
      ) : (
        ""
      )}

      {currentQuiz < quizzes.length ? (
        ""
      ) : (
        <ModalResult
          isOpen={isOpen}
          onClose={onClose}
          rightAnswers={rightAnswers}
        />
      )}
    </Flex>
  );
}

export default QuizList;
