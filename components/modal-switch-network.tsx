import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ChainId,
  useActiveChain,
  useDisconnect,
  useSwitchChain,
} from "@thirdweb-dev/react";
import { useEffect } from "react";

const ModalSwitchNetwork = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const disconnect = useDisconnect();
  const network = useActiveChain();
  const setNetwork = useSwitchChain();

  const switchNetwork = async () => {
    if (network?.chainId == ChainId.Mumbai && isOpen) {
      onClose();
    } else if (setNetwork) {
      await setNetwork(ChainId.Mumbai);
    }
  };

  useEffect(() => {
    if (network && network?.chainId) {
      const currentChainId = network.chainId;
      if (currentChainId !== ChainId.Mumbai && !isOpen) {
        onOpen();
      } else if (currentChainId == ChainId.Mumbai && isOpen) {
        onClose();
      }
    }
  }, [network?.chainId]);

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      closeOnOverlayClick
      onClose={() => {
        disconnect();
        onClose();
      }}
      scrollBehavior="inside"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />
      <ModalContent>
        <ModalHeader>Wrong network</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Current network not support</Text>
          <Center mt={4}>
            <Button
              onClick={switchNetwork}
              _hover={{ bg: "#3443DD" }}
              color="white"
              bg="#3443A0"
            >
              Switch to Mumbai network
            </Button>
          </Center>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};
export default ModalSwitchNetwork;
