import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Center,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ChainId,
  useActiveChain,
  useAddress,
  useConnectionStatus,
  useDisconnect,
  useSDK,
} from "@thirdweb-dev/react";
import { useEffect } from "react";
import { useStoreActions } from "../services/redux/hook";

const ModalSignMessage = () => {
  const disconnect = useDisconnect();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const getUserDataAction = useStoreActions((state) => state.user.getData);
  const clearUserStateAction = useStoreActions(
    (state) => state.user.clearState
  );
  const sdk = useSDK();
  const connectionStatus = useConnectionStatus();
  const address = useAddress();
  const network = useActiveChain();

  const signMessage = async () => {
    if (sdk && address && connectionStatus == "connected") {
      const signature = await sdk.wallet.sign("Music protocol");
      localStorage.setItem("address", address.toLowerCase());
      localStorage.setItem("signature", signature);
      await getUserData();
      onClose();
    }
  };

  const getUserData = async () => {
    if (address && connectionStatus == "connected") getUserDataAction(address);
  };

  useEffect(() => {
    if (network?.chainId && sdk) {
      const currentChainId = network.chainId;
      if (currentChainId == ChainId.Mumbai && address) {
        if (
          localStorage.getItem("address") != address.toLowerCase() ||
          !localStorage.getItem("signature")
        ) {
          clearUserStateAction();
          onOpen();
        } else {
          getUserData();
        }
      } else if (isOpen) {
        onClose();
      }
    }
  }, [sdk, network?.chainId, address]);

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
        <ModalHeader>Sign message for verify your wallet</ModalHeader>
        <ModalBody>
          <Center>
            <Button
              onClick={signMessage}
              _hover={{ bg: "#3443DD" }}
              color="white"
              bg="#3443A0"
            >
              Sign message
            </Button>
          </Center>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default ModalSignMessage;
