import { Button, Flex, Heading } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { IQuiz } from "../../types/quiz.type";

interface GameOverProps {
  rightAnswers: number;
  restartGame: () => void;
  rightAnswersArr: string[];
  quizzes: IQuiz[];
}

function GameOver({
  rightAnswers,
  restartGame,
  rightAnswersArr,
  quizzes,
}: GameOverProps) {
  return (
    <Flex flexDirection="column">
      <Button colorScheme="blue" mr={3} onClick={restartGame}>
        Restart
      </Button>
      {quizzes.map((quiz) => (
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
                  <Button
                    key={uuidv4()}
                    colorScheme="teal"
                    w="100%"
                    borderRadius="20"
                  >
                    {item[1]}
                  </Button>
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
