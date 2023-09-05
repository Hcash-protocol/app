import {
  Button,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDeposit } from "../hooks/hcash";
const steps = [{ value: "0.1" }, { value: "10" }, { value: "100" }];

const Deposit = () => {
  const [amount, setAmount] = useState<string>(steps[0].value);
  const { deposit } = useDeposit();
  return (
    <>
      <Stack direction={["column"]}>
        <Text>Amount</Text>
        <RadioGroup onChange={setAmount} value={amount}>
          <Stack w={"full"} direction="row">
            {steps.map((step, index) => (
              <Stack
                flex={1}
                justifyContent={"center"}
                alignItems={"center"}
                direction={"row"}
                key={index}
              >
                <Radio value={step.value}>{step.value} </Radio>
                <Image
                  alt={step.value}
                  w={"20px"}
                  h={"20px"}
                  src="https://s2.coinmarketcap.com/static/img/coins/200x200/3890.png"
                />
              </Stack>
            ))}
          </Stack>
        </RadioGroup>
        <Button
          onClick={() => deposit(amount)}
          disabled={!amount}
          mt={"2"}
          colorScheme="teal"
        >
          Deposit
        </Button>
      </Stack>
    </>
  );
};

export default Deposit;
