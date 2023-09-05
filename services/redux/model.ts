import { Action } from "easy-peasy";

type TxStateProps = "pending" | "process" | "success" | "error";
interface Transaction {
  content: {
    title: string;
    value: any;
  }[];
  reason?: string;
  receipt?: any;
  txState?: TxStateProps;
}
interface ModalTransaction {
  transaction: Transaction;
  isOpen: boolean;
  setTransaction: Action<ModalTransaction, Transaction>;
  onClose: Action<ModalTransaction>;
  onOpen: Action<ModalTransaction>;
}
interface StoreModel {
  modalTransaction: ModalTransaction;
}

export default StoreModel;
