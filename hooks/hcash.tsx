import { useAddress, useSDK } from "@thirdweb-dev/react";
import LinkScan from "../components/link-scan";
import { useModalTransaction } from "../components/modal-transaction";
import { ABI } from "../constants/abi";

const useDeposit = () => {
  const sdk = useSDK();
  const { onOpen: onOpenModalTx, setTransaction } = useModalTransaction();
  const deposit = async (amount: string) => {
    if (sdk) {
      try {
        onOpenModalTx();
        const res = await sdk.wallet.transfer(ABI.HcashPool.address, amount);
        setTransaction({
          content: [
            {
              title: res.receipt.transactionHash,
              value: <LinkScan transactionHash={res.receipt.transactionHash} />,
            },
          ],
          txState: "success",
        });
      } catch (error: any) {
        setTransaction({
          reason: error.message,
          content: [],
          txState: "error",
        });
      }
    }
  };

  return {
    deposit,
  };
};
const useWithdrawl = () => {
  const sdk = useSDK();
  const address = useAddress();
  const { onOpen: onOpenModalTx, setTransaction } = useModalTransaction();

  const withdrawl = async (toAddress: string, note: string) => {
    if (sdk) {
      const hcashContract = await sdk.getContractFromAbi(
        ABI.HcashPool.address,
        ABI.HcashPool.abi
      );
    }
  };

  return { withdrawl };
};
export { useDeposit, useWithdrawl };
