import { Button, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import QuizApi from "../../services/QuizApi";
import { IQuiz } from "../../types/quiz.type";

function QuizCard() {
  const { getRandomQuiz } = QuizApi();
  const [quiz, setQuiz] = useState<IQuiz>();

  useEffect(() => {
    getRandomQuiz()
      .then((data) => setQuiz(...data))
      .catch((error) => console.log(error));
  }, []);

  console.log(quiz);

  return (
    <Flex
      border="1px solid black"
      p="10"
      flexDirection="column"
      alignItems="center"
      maxW="900"
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
              item[1] !== null ? <Button key={uuidv4()}>{item[1]}</Button> : ""
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
