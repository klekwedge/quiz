import { Button, Flex, Heading } from "@chakra-ui/react";
import { BaseSyntheticEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { IQuiz } from "../../types/quiz.type";

interface QuizCardProps {
  quiz: IQuiz;
}

function QuizCard({ quiz }: QuizCardProps) {
  const buttonClick = (e: BaseSyntheticEvent) => {
    if (quiz) {
      const answers = Object.entries(quiz.answers);
      const correctAnswers = Object.entries(quiz.correct_answers);
      const findEl = answers.find((item) => item[1] === e.target.innerText);

      if (findEl) {
        for (const key in correctAnswers) {
          const correctAnswer = correctAnswers[key];
          if (
            correctAnswer[0].includes(findEl[0]) &&
            correctAnswer[1] === "true"
          ) {
            console.log("NICE!");
          }
        }
      }
    }
  };

  return (
    <Flex
      border="1px solid black"
      p="10"
      flexDirection="column"
      alignItems="center"
      borderRadius="10px"
      background="white"
    >
      {quiz ? (
        <>
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
                  onClick={buttonClick}
                  datatype={"1"}
                  colorScheme="teal"
                >
                  {item[1]}
                </Button>
              ) : (
                ""
              )
            )}
          </Flex>
        </>
      ) : (
        ""
      )}
    </Flex>
  );
}

export default QuizCard;
