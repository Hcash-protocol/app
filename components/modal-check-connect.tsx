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
  Stack,
} from "@chakra-ui/react";
import {
  ChainId,
  useActiveChain,
  useConnectionStatus,
  useDisconnect,
  useMetamask,
  useSwitchChain,
  useWalletConnect,
} from "@thirdweb-dev/react";
import { useEffect } from "react";
import { useStoreActions, useStoreState } from "../services/redux/hook";

const ModalCheckConnect = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => {},
  });
  const connectionStatus = useConnectionStatus();

  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();

  useEffect(() => {
    if (connectionStatus != "connected") {
    }

    if (connectionStatus != "connected") {
      onOpen();
    } else {
      onClose();
    }
  }, [connectionStatus, onOpen, onClose]);

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
