import { action, createStore } from "easy-peasy";
import StoreModel from "./model";

const store = createStore<StoreModel>({
  modalTransaction: {
    isOpen: false,
    transaction: {
      content: [],
      txState: "pending",
    },
    setTransaction: action((state, payload) => {
      state.transaction = payload;
    }),
    onClose: action((state) => {
      state.isOpen = false;
    }),
    onOpen: action((state) => {
      state.transaction = {
        content: [],
        txState: "pending",
      };
      state.isOpen = true;
    }),
  },
});

export default store;
