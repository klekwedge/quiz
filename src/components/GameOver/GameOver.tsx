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
  const checkCorrect = (quiz: IQuiz, currentAnswer: string[], index: number) => {
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
      <Heading mb="20px" fontSize="35px">
        Your score: {rightAnswers} / {quizzes.length}
      </Heading>
      <Button colorScheme="blue" mb="20px" onClick={restartGame}>
        Restart
      </Button>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="30px"
      >
        {quizzes.map((quiz, index) => (
          <Flex
            maxW="600px"
            w="100%"
            key={uuidv4()}
            border="1px solid black"
            p="10px"
            flexDirection="column"
            alignItems="center"
            borderRadius="10px"
            tabIndex={0}
          >
            <Heading
              as="h2"
              fontSize="30px"
              fontWeight="600"
              mb="20px"
              textAlign="center"
            >
              {quiz.question}
            </Heading>
            <Flex
              justifyContent="center"
              alignItems="center"
              gap="15px"
              flexWrap="wrap"
              flexDirection="column"
            >
              {Object.entries(quiz.answers).map((item) =>
                item[1] !== null ? (
                  <Tag
                    key={uuidv4()}
                    display="inline-block"
                    textAlign="center"
                    w="100%"
                    fontSize="20px"
                    borderRadius="20px"
                    colorScheme={checkCorrect(quiz, item, index)}
                  >
                    {item[1]}
                  </Tag>
                ) : (
                  ""
                )
              )}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}

export default GameOver;
