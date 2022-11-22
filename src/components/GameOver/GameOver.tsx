import { Button, Flex, Heading, Tag } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import useCorrectAnswer from "../../hooks/useCorrectAnswer";
import { IQuiz } from "../../types/quiz.type";

interface GameOverProps {
  rightAnswers: number;
  restartGame: () => void;
  answers: string[];
  quizzes: IQuiz[];
}

function GameOver({
  rightAnswers,
  restartGame,
  answers,
  quizzes,
}: GameOverProps) {
  const isCorrect = (quiz: IQuiz, currentAnswer: string[], index: number) => {
    const { isCorrect, answer } = useCorrectAnswer(
      quiz.answers,
      quiz.correct_answers,
      currentAnswer[1]
    );

    if (answers[index] === answer) {
      return isCorrect ? "green" : "red";
    }

    return isCorrect ? "green" : "";
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      <Button colorScheme="blue" mb="15" onClick={restartGame} maxW="200">
        Restart
      </Button>
      {quizzes.map((quiz, index) => (
        <Flex
          key={uuidv4()}
          border="1px solid black"
          p="10"
          flexDirection="column"
          alignItems="center"
          borderRadius="10px"
          background="white"
        >
          <Flex flexDirection="column">
            <Heading as="h2" mb="5" textAlign="center">
              {quiz.question}
            </Heading>
            <Flex
              justifyContent="center"
              alignItems="center"
              gap="3"
              wrap="wrap"
              flexDirection="column"
            >
              {Object.entries(quiz.answers).map((item) =>
                item[1] !== null ? (
                  <Tag
                    key={uuidv4()}
                    textAlign="center"
                    w="100%"
                    borderRadius="20"
                    colorScheme={isCorrect(quiz, item, index)}
                  >
                    {item[1]}
                  </Tag>
                ) : (
                  ""
                )
              )}
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}

export default GameOver;
