import {
  Box,
  Button,
  Center,
  Input,
  Skeleton,
  Stack,
  Text,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useModalTransaction } from "../components/modal-transaction";
import BaseLayout from "../layouts/base";

const Hcash: NextPage = () => {
  const [isLoading, setLoading] = useBoolean(true);
  const [publicKey, setPublicKey] = useState<string>("");
  const [privKey, setPrivKey] = useState<string>("");
  const [toAddress, setToAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const [stealthAddress, setStealthAddress] = useState<string>("");

  const connectedAddress = useAddress();
  const { onOpen, setTxResult } = useModalTransaction();

  const sdk = useSDK();
  const toast = useToast({
    containerStyle: {
      maxWidth: "200px",
    },
  });

  useEffect(() => {
    if (connectedAddress && sdk) {
      setToAddress("");
      setStealthAddress("");
      setAmount("");
    }
  }, [connectedAddress, sdk]);

  return (
    <BaseLayout selectTabIndex={5}>
      <Box boxShadow="lg" bg={"white"} borderRadius={5} p={5}>
        <Skeleton isLoaded={!isLoading}>
          <Stack direction={["column", "column", "row"]}>
            <Center>
              <Text overflowWrap="anywhere">Your public key: {publicKey}</Text>
            </Center>
          </Stack>
        </Skeleton>
      </Box>
      <Box boxShadow="lg" bg={"white"} mt={5} borderRadius={5} p={5}>
        <Text fontWeight="bold" fontSize={["xs", "sm", "md", "lg", "xl"]}>
          Your Stealth Address
        </Text>
        <Skeleton isLoaded={!isLoading}>
          <Stack direction={["column"]}></Stack>
        </Skeleton>
      </Box>
      <Box boxShadow="lg" bg={"white"} borderRadius={5} mt={5} p={5}>
        <Text fontWeight="bold" fontSize={["xs", "sm", "md", "lg", "xl"]}>
          Transfer Matic
        </Text>
        <Skeleton mt={5} isLoaded={!isLoading}>
          <Stack direction={["column"]}>
            <Text>To Address</Text>
            <Input value={toAddress} placeholder="" />
            {stealthAddress && (
              <Stack>
                <Text color="red.500" fontSize={["sm"]}>
                  Stealth Address: {stealthAddress}
                </Text>
              </Stack>
            )}

            <Text mt={5}>Amount</Text>
            <Input value={amount} placeholder="MATIC" />
            <Button
              disabled={
                !stealthAddress ||
                !amount ||
                !toAddress ||
                !publicKey ||
                !privKey ||
                toAddress == stealthAddress ||
                toAddress == connectedAddress
              }
              mt={"10"}
              colorScheme="teal"
            >
              Transfer
            </Button>
          </Stack>
        </Skeleton>
      </Box>
    </BaseLayout>
  );
};

export default Hcash;
