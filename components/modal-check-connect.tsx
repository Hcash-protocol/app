import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  useConnectionStatus,
  useMetamask,
  useWalletConnect,
} from "@thirdweb-dev/react";
import { useEffect } from "react";

const ModalCheckConnect = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => {},
  });
  const connectionStatus = useConnectionStatus();

  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();

  useEffect(() => {
    if (connectionStatus === "connected") {
      onClose();
    }
  }, [connectionStatus, onClose]);

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      closeOnOverlayClick
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />
      <ModalContent>
        <ModalHeader>Wallet connect</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Connect your wallet to using this app</Text>
          <Stack mt={4}>
            <Button
              onClick={() => connectWithMetamask()}
              _hover={{ bg: "#3443DD" }}
              color="white"
              bg="#3443A0"
            >
              Metamask
            </Button>
            <Button
              onClick={() => connectWithWalletConnect()}
              _hover={{ bg: "#3443DD" }}
              color="white"
              bg="#3443A0"
            >
              WalletConnect
            </Button>
          </Stack>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};
export default ModalCheckConnect;
