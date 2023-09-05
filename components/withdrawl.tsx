import { Button, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
const steps = [{ value: "0.1" }, { value: "10" }, { value: "100" }];

const Withdrawl = () => {
  const [toAddress, setToAddress] = useState<string>("");

  return (
    <>
      <Stack direction={["column"]}>
        <Text>To address</Text>
        <Input
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
        />
        <Button disabled={!toAddress} mt={"2"} colorScheme="teal">
          Withdraw
        </Button>
      </Stack>
    </>
  );
};

export default Withdrawl;
