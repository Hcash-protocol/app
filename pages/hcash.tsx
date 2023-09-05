import {
  Box,
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Deposit from "../components/deposit";
import Withdrawl from "../components/withdrawl";
import BaseLayout from "../layouts/base";
import { useBalance } from "@thirdweb-dev/react";

const Hcash: NextPage = () => {
  const toast = useToast({
    containerStyle: {
      maxWidth: "200px",
    },
  });

  const { data } = useBalance();

  return (
    <BaseLayout selectTabIndex={5}>
      <Center>
        <Box
          boxShadow="lg"
          bg={"white"}
          w={{
            base: "full",
            md: "550px",
            lg: "550px",
          }}
          borderRadius={5}
          mt={5}
          p={5}
        >
          <Center my="2">
            <Text>Your balance {data?.displayValue} MATIC</Text>
          </Center>
          <Tabs size="md" variant="enclosed">
            <TabList justifyContent={"space-between"}>
              <Tab>
                <Text
                  fontWeight="bold"
                  fontSize={["xs", "sm", "md", "lg", "xl"]}
                >
                  Deposit
                </Text>
              </Tab>
              <Tab>
                <Text
                  fontWeight="bold"
                  fontSize={["xs", "sm", "md", "lg", "xl"]}
                >
                  Withdrawl
                </Text>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Deposit />
              </TabPanel>
              <TabPanel>
                <Withdrawl />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Center>
    </BaseLayout>
  );
};

export default Hcash;
