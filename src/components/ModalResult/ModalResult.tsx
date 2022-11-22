import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

interface ModalResultProps {
  rightAnswers: number;
  isOpen: boolean;
  onClose: () => void;
}

function ModalResult({ isOpen, onClose, rightAnswers }: ModalResultProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Your result: {rightAnswers}</ModalHeader>
        <ModalBody>Answer list</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Restart
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalResult;
