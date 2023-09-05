import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useCallback, useEffect, useMemo } from "react";
import { useStoreActions, useStoreState } from "../services/redux/hook";

const ModalTransactionComponent = () => {
  const { isOpen, transaction } = useStoreState(
    (state) => state.modalTransaction
  );

  const setTransaction = useStoreActions(
    (action) => action.modalTransaction.setTransaction
  );

  const onClose = useStoreActions((action) => action.modalTransaction.onClose);

  const handleTxState = useMemo(() => {
    switch (transaction.txState) {
      case "pending":
        return (
          <>
            <ModalHeader>Transaction processing</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Spinner color="green.500" />
            </ModalBody>
          </>
        );
      case "process":
        return (
          <>
            <ModalHeader>Transaction processing</ModalHeader>
            <ModalCloseButton />
            {transaction.content.map((item, index) => (
              <ModalBody key={index}>
                <Text fontWeight="bold">{item.title}</Text>
                <Text color={"green"} fontSize={"sm"}>
                  {item.value}
                </Text>
              </ModalBody>
            ))}
          </>
        );
      case "success":
        return (
          <>
            <ModalHeader>Transaction success</ModalHeader>
            <ModalCloseButton />
            {transaction.content.map((item, index) => (
              <ModalBody key={index}>
                <Text fontWeight="bold">{item.title}</Text>
                <Text color={"green"} fontSize={"sm"}>
                  {item.value}
                </Text>
              </ModalBody>
            ))}
          </>
        );
      case "error":
        return (
          <>
            <ModalHeader>Transaction error</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Reason: {transaction.reason}</Text>
            </ModalBody>
          </>
        );

      default:
        break;
    }
  }, [transaction.txState, transaction.content, transaction.reason]);

  const clearTxResult = useCallback(() => {
    setTransaction({
      content: [],
      txState: "pending",
    });
  }, [setTransaction]);

  useEffect(() => {
    if (isOpen) clearTxResult();
  }, [isOpen, clearTxResult]);

  return (
    <Modal
      isCentered
      isOpen={!!isOpen}
      closeOnOverlayClick={transaction.txState != "pending"}
      onClose={() => {
        onClose();
        clearTxResult();
      }}
      scrollBehavior="inside"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />
      <ModalContent>
        {handleTxState}
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const useModalTransaction = () => {
  const { isOpen, transaction } = useStoreState(
    (state) => state.modalTransaction
  );

  const setTransaction = useStoreActions(
    (action) => action.modalTransaction.setTransaction
  );

  const onOpen = useStoreActions((action) => action.modalTransaction.onOpen);

  return {
    isOpen,
    onOpen,
    transaction,
    setTransaction,
  };
};
export { useModalTransaction };
export default ModalTransactionComponent;
