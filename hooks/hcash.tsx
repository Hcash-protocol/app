import { Text } from "@chakra-ui/react";
import { useSDK } from "@thirdweb-dev/react";
import LinkScan from "../components/link-scan";
import { useModalTransaction } from "../components/modal-transaction";
import { ABI } from "../constants/abi";
import ApiServices from "../services/api";

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
              title: "Transaction Hash",
              value: <LinkScan transactionHash={res.receipt.transactionHash} />,
            },
          ],
          txState: "success",
        });

        const proofRes = await ApiServices.hcash.proof(
          res.receipt.transactionHash
        );
        setTransaction({
          content: [
            {
              title: "Transaction Hash",
              value: <LinkScan transactionHash={res.receipt.transactionHash} />,
            },
            {
              title: "Proof data, please copy it",
              value: (
                <Text
                  cursor={"pointer"}
                  _hover={{
                    color: "blue",
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      JSON.stringify(proofRes.data.data)
                    );
                  }}
                >
                  {JSON.stringify(proofRes.data.data)}
                </Text>
              ),
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
  const { onOpen: onOpenModalTx, setTransaction } = useModalTransaction();

  const withdrawl = async (toAddress: string, note: string) => {
    if (sdk) {
      try {
        onOpenModalTx();
        const data = JSON.parse(note);
        const hcashContract = await sdk.getContractFromAbi(
          ABI.HcashPool.address,
          ABI.HcashPool.abi
        );
        const res = await hcashContract.call("withdrawl", [...data, toAddress]);
        setTransaction({
          content: [
            {
              title: "Transaction Hash",
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

  return { withdrawl };
};
export { useDeposit, useWithdrawl };
