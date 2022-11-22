import { Button, Flex, Heading } from "@chakra-ui/react";
import { BaseSyntheticEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import useCorrectAnswer from "../../hooks/useCorrectAnswer";
import { IQuiz } from "../../types/quiz.type";

interface QuizCardProps {
  quiz: IQuiz;
  incRightAnswers: () => void;
  incCurrentQuiz: () => void;
}

function QuizCard({ quiz, incRightAnswers, incCurrentQuiz }: QuizCardProps) {
  const buttonClick = (e: BaseSyntheticEvent) => {
    if (quiz) {
      const isCorrectAnswer = useCorrectAnswer(
        quiz.answers,
        quiz.correct_answers,
        e.target.innerText
      );

      if (isCorrectAnswer) {
        incRightAnswers();
      }
    }
    incCurrentQuiz();
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
        </>
      ) : (
        ""
      )}
    </Flex>
  );
}

export default QuizCard;
