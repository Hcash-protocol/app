import {
  Box,
  Button,
  FlexProps,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ConnectWallet, useAddress, useDisconnect } from "@thirdweb-dev/react";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoLogOut } from "react-icons/io5";
import { SideBarDataProps } from "../constants/data/sidebar";
import ModalCheckConnect from "./modal-check-connect";
import ModalSignMessage from "./modal-sign-message";
import ModalSwitchNetwork from "./modal-switch-network";

function Sidebar({
  content,
  isLoading,
}: {
  data: Array<SideBarDataProps>;
  content: React.ReactNode;
  selectIndex: number;
  isLoading: boolean;
}) {
  return (
    <Box
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundColor: "#f0f0f0",
      }}
      minH="100vh"
      pb={"200px"}
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <ModalCheckConnect />
      <ModalSwitchNetwork />
      <ModalSignMessage />
      {/* mobilenav */}
      <AppNav />
      <Box
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
        p="4"
        pt={20}
      >
        {isLoading ? (
          <Stack
            justifyContent="center"
            alignItems="center"
            w={"100%"}
            h={"70vh"}
          >
            <Spinner
              thickness="7px"
              speed="1s"
              emptyColor="gray.200"
              color="yellow.400"
              size="xl"
            />
          </Stack>
        ) : (
          content
        )}
      </Box>
    </Box>
  );
}

interface AppNavProps extends FlexProps {}

const AppNav = ({}: AppNavProps) => {
  const address = useAddress();
  const disconnect = useDisconnect();

  return (
    <Stack
      position={"fixed"}
      right={0}
      left={0}
      p={{ base: 1, md: 3 }}
      py={{ base: 2, md: 3 }}
      direction={"row"}
      borderBottomWidth={2.5}
      borderColor={"yellow.400"}
      zIndex={10}
      justifyContent={"space-between"}
    >
      <Text fontFamily={"heading"} fontWeight={"bold"} fontSize={"3xl"}>
        Hcash
      </Text>
      <Popover closeOnBlur={false} trigger="hover" placement="bottom-start">
        <PopoverTrigger>
          <Button
            bg="transparent"
            _hover={{ bg: "transparent" }}
            boxShadow={"2xl"}
          >
            <CgProfile size={30} color={"#fcae00"} />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>Wallet</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <ConnectWallet />
          </PopoverBody>
          {address && (
            <Stack
              cursor="pointer"
              p="4"
              onClick={() => {
                if (address) disconnect();
              }}
              borderTopWidth={1}
              borderTopColor="rgba(0, 0, 0, 0.1)"
              borderBottomColor="rgba(0, 0, 0, 0.1)"
              borderBottomWidth={1}
              _hover={{
                bg: "rgba(0, 0, 0, 0.1)",
              }}
              alignItems="center"
              direction="row"
            >
              <IoLogOut color="#B12222" />
              <Text color="#B12222" fontWeight="bold" fontFamily={"mono"}>
                Logout
              </Text>
            </Stack>
          )}
        </PopoverContent>
      </Popover>
    </Stack>
  );
};

export default Sidebar;
