import { Button, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

const Withdrawl = () => {
  const [toAddress, setToAddress] = useState<string>("");
  const [note, setNote] = useState<string>("");

  return (
    <>
      <Stack direction={["column"]}>
        <Text>Private note</Text>
        <Input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="This note was reveal when deposit"
        />
        <Text>To address</Text>
        <Input
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
        />
        <Button disabled={!toAddress} mt={"2"} colorScheme="teal">
          Withdrawl
        </Button>
      </Stack>
    </>
  );
};

export default Withdrawl;
