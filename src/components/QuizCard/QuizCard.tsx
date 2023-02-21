import { Button, Flex, Heading } from "@chakra-ui/react";
import { BaseSyntheticEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import useCorrectAnswer from "../../hooks/useCorrectAnswer";
import { IQuiz } from "../../types/quiz.type";

interface QuizCardProps {
  quiz: IQuiz;
  incRightAnswers: () => void;
  incCurrentQuiz: () => void;
  pushAnswer: (answer: string) => void;
}

function QuizCard({
  quiz,
  incRightAnswers,
  incCurrentQuiz,
  pushAnswer,
}: QuizCardProps) {
  const nextQuestion = (e: BaseSyntheticEvent) => {
    if (quiz) {
      const { isCorrect, answer } = useCorrectAnswer(
        quiz.answers,
        quiz.correct_answers,
        e.target.innerText
      );

      if (isCorrect) {
        incRightAnswers();
      }
      pushAnswer(answer);
      incCurrentQuiz();
    }
  };

  return (
    <Flex
      border="1px solid black"
      p="20px 10px"
      flexDirection="column"
      alignItems="center"
      borderRadius="10px"
      background="white"
      maxW="600px"
      w="100%"
    >
      {quiz ? (
        <>
          <Heading
            as="h2"
            fontWeight="600"
            fontSize="30px"
            mb="5"
            textAlign="center"
          >
            {quiz.question}
          </Heading>
          <Flex
            // justifyContent="center"
            // alignItems="center"
            gap="10px"
            wrap="wrap"
            flexDirection="column"
          >
            {Object.entries(quiz.answers).map((item) =>
              item[1] !== null ? (
                <Button
                  whiteSpace="normal"
                  transition="all 0.5s ease"
                  _hover={{
                    background: "teal.600",
                  }}
                  _focus={{
                    background: "teal.600",
                  }}
                  fontWeight="500"
                  key={uuidv4()}
                  textAlign="center"
                  onClick={nextQuestion}
                  background="teal.400"
                  fontSize='20px'
                  color="white"
                  p="10px"
                  borderRadius="20px"
                  h='100%'
                >
                  {`${item[1]}`}
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
