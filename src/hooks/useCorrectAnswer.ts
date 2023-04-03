const useCorrectAnswer = (answers: any, correctAnswers: any, selectedAnswer: any) => {
  const quizAnswers = Object.entries(answers);
  const quizCorrectAnswers = Object.entries(correctAnswers);
  const quizSelectedAnswer = quizAnswers.find((item) => item[1] === selectedAnswer);

  const quizCorrectAnswersList = Object.values(quizCorrectAnswers);

  if (quizSelectedAnswer) {
    for (let i = 0; i < quizCorrectAnswersList.length; i += 1) {
      const correctAnswer = quizCorrectAnswersList[i];
      if (correctAnswer[0].includes(quizSelectedAnswer[0]) && correctAnswer[1] === 'true') {
        return {
          isCorrect: true,
          answer: selectedAnswer,
        };
      }
    }
  }
  return {
    isCorrect: false,
    answer: selectedAnswer,
  };
};

export default useCorrectAnswer;
