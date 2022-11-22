import { Flex } from "@chakra-ui/react";
import QuizList from "../QuizList/QuizList";

function App() {
  return (
    <Flex background="blue.200" alignItems="center" justifyContent="center">
      <QuizList />
    </Flex>
  );
}

export default App;
