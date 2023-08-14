import { Button, Card, CardBody, Flex, Heading, Stack } from '@chakra-ui/react';
import { BaseSyntheticEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useCorrectAnswer from '../../hooks/useCorrectAnswer';
import { IQuiz } from '../../types/quiz.type';

interface QuizCardProps {
  quiz: IQuiz;
  incRightAnswers: () => void;
  incCurrentQuiz: () => void;
  pushAnswer: (answer: string) => void;
}

function QuizCard({ quiz, incRightAnswers, incCurrentQuiz, pushAnswer }: QuizCardProps) {
  const nextQuestion = (e: BaseSyntheticEvent) => {
    if (quiz) {
      const { isCorrect, answer } = useCorrectAnswer(quiz.answers, quiz.correct_answers, e.target.innerText);

      if (isCorrect) {
        incRightAnswers();
      }
      pushAnswer(answer);
      incCurrentQuiz();
    }
  };

  if (!quiz) {
    return null;
  }

  return (
    <Card
      maxW="550px"
      w="100%"
    >
      <CardBody>
        <Stack mt="6" spacing="3">
          <Heading as="h2" size="md">
            {quiz.question}
          </Heading>
          <Flex gap="15px" wrap="wrap" flexDirection="column">
            {Object.entries(quiz.answers).map((item) =>
              item[1] !== null ? (
                <Button
                  colorScheme="blue"
                  whiteSpace="normal"
                  transition="all 0.5s ease"
                  fontWeight="500"
                  key={uuidv4()}
                  textAlign="center"
                  onClick={nextQuestion}
                  fontSize="20px"
                  p="5px 10px"
                  borderRadius="20px"
                  h="100%"
                >
                  {`${item[1]}`}
                </Button>
              ) : (
                ''
              ),
            )}
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default QuizCard;
