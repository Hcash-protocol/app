import { Spinner, useToast } from "@chakra-ui/react";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import { signERC2612Permit } from "eth-permit";
import { ethers } from "ethers";
import LinkScan from "../components/link-scan";
import { useModalTransaction } from "../components/modal-transaction";
import { useStoreActions } from "../services/redux/hook";
import { ABI } from "../constants/abi";

const useDeposit = () => {
  const sdk = useSDK();
  const address = useAddress();

  const { onOpen: onOpenModalTx, setTxResult } = useModalTransaction();
  const toast = useToast();

  const permitMuc = async (priceMuc: string) => {
    if (!sdk) return;
    if (!onOpenModalTx) return;
    if (!address) return;
    const mucContract = await sdk.getContractFromAbi(
      ABI.HcashPool.address,
      ABI.HcashPool.abi
    );
    const { value } = await mucContract.erc20.balanceOf(address);

    if (value.lt(priceMuc)) {
      toast({
        title: "Insufficient balance",
        description: "Please top up your MUC balance",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    onOpenModalTx();

    const allowance = await mucContract.erc20.allowance(ABI.HcashPool.address);

    if (allowance.value.gte(priceMuc)) return;

    const result = await signERC2612Permit(
      window.ethereum,
      ABI.HcashPool.address,
      address,
      ABI.HcashPool.address,
      priceMuc
    );
    setTxResult({
      reason: "",
      content: [
        {
          title: "Approve Signature",
          value: result.r + result.s + result.v,
        },
        {
          title: "Buy Transaction Hash",
          value: <Spinner colorScheme="green.500" />,
        },
      ],
      txState: "success",
    });
    return result;
  };

  const onBuy = async (price: string, id: string) => {};

  const onBuyCallBack = async (price: string, id: string) => {
    if (sdk && onOpenModalTx && address) {
      try {
        const musicMarketContract = await sdk.getContractFromAbi(
          ABI.HcashPool.address,
          ABI.HcashPool.abi
        );

        const approveMuc = await permitMuc(
          ethers.utils.parseEther(price).toString()
        );
        if (!approveMuc) return;
        onOpenModalTx();
        const res = await musicMarketContract.call("buySong", [
          ABI.HcashPool.address,
          id,
          approveMuc.deadline,
          approveMuc.v,
          approveMuc.r,
          approveMuc.s,
        ]);
        setTxResult({
          reason: "",
          content: [
            ...[
              approveMuc && {
                title: "Approve Transaction Hash",
                value: approveMuc.r + approveMuc.s + approveMuc.v,
              },
            ],
            {
              title: "Transaction Hash",
              value: <LinkScan transactionHash={res.receipt.transactionHash} />,
            },
          ],
          txState: "success",
        });
      } catch (error: any) {
        setTxResult({
          reason: error.message,
          content: [],
          txState: "error",
        });
      }
    }
  };

  return { onBuy };
};
const useWithdrawl = () => {
  const sdk = useSDK();
  const address = useAddress();
  const { onOpen: onOpenModalTx, setTxResult } = useModalTransaction();

  const onList = async (
    id: string,
    price: string,
    amount: string,
    uri: string
  ) => {};

  const onListCallBack = async (
    id: string,
    price: string,
    amount: string,
    uri: string
  ) => {
    if (sdk && onOpenModalTx && address) {
      try {
        setTxResult((prev: any) => ({
          content: [
            ...prev.content,
            {
              title: "Transaction Hash",
              value: <Spinner color="green.500" />,
            },
          ],
        }));
        const musicMarketContract = await sdk.getContractFromAbi(
          ABI.HcashPool.address,
          ABI.HcashPool.abi
        );
        const res = await musicMarketContract.call("listSong", [
          id,
          ethers.utils.parseUnits(price, "ether"),
          amount,
          uri,
        ]);
        setTxResult((prev: any) => ({
          content: [
            ...prev.content.filter(
              (item: any) => item.title !== "Transaction Hash"
            ),
            {
              title: "Transaction Hash",
              value: <LinkScan transactionHash={res.receipt.transactionHash} />,
            },
          ],
          txState: "success",
        }));
      } catch (error: any) {
        setTxResult({
          reason: error.message,
          content: [],
          txState: "error",
        });
      }
    }
  };

  return { onList };
};
export { useDeposit, useWithdrawl };
