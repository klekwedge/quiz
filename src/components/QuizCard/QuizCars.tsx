import { Button, Flex, Heading } from "@chakra-ui/react";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import QuizApi from "../../services/QuizApi";
import { IQuiz } from "../../types/quiz.type";

function QuizCard() {
  const { getRandomQuiz } = QuizApi();
  const [quiz, setQuiz] = useState<IQuiz>();

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

  useEffect(() => {
    getRandomQuiz()
      .then((data) => setQuiz(...data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Flex
      border="1px solid black"
      p="10"
      flexDirection="column"
      alignItems="center"
    >
      {quiz ? (
        <>
          <Heading as="h2" mb="5">
            {quiz.question}
          </Heading>
          <Flex
            justifyContent="center"
            alignItems="center"
            gap="10"
            wrap="wrap"
          >
            {Object.entries(quiz.answers).map((item) =>
              item[1] !== null ? (
                <Button key={uuidv4()} onClick={buttonClick}>
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
