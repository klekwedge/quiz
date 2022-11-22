import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from "@chakra-ui/react";

interface ModalResultProps {
  rightAnswers: number;
  isOpen: boolean;
  onClose: () => void;
  restartGame: () => void;
}

function ModalResult({
  isOpen,
  onClose,
  rightAnswers,
  restartGame,
}: ModalResultProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Your result: {rightAnswers}</ModalHeader>
        <ModalBody>Answer list</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={restartGame}>
            Restart
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalResult;
