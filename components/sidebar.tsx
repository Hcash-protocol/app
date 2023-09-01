import {
  Box,
  BoxProps,
  Button,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Image,
  InputGroup,
  Link,
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
  useDisclosure,
} from "@chakra-ui/react";
import { ConnectWallet, useAddress, useDisconnect } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { IconType } from "react-icons";
import { CgProfile } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";
import { SideBarDataProps } from "../constants/data/sidebar";
import backgroundImage from "../public/background.png";
import ModalCheckConnect from "./modal-check-connect";
import ModalSignMessage from "./modal-sign-message";
import ModalSwitchNetwork from "./modal-switch-network";

function Sidebar({
  data,
  content,
  selectIndex,
  isLoading,
}: {
  data: Array<SideBarDataProps>;
  content: React.ReactNode;
  selectIndex: number;
  isLoading: boolean;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundColor: "#0D164D",
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
      <SidebarContent
        data={data}
        selectIndex={selectIndex}
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            selectIndex={selectIndex}
            data={data}
            onClose={onClose}
          />
        </DrawerContent>
      </Drawer>

      {/* mobilenav */}
      <AppNav onOpen={onOpen} />
      <Box
        ml={{ base: 0, md: 60 }}
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

interface SidebarProps extends BoxProps {
  onClose: () => void;
  selectIndex: number;
  data: Array<SideBarDataProps>;
}

const SidebarContent = ({
  onClose,
  data,
  selectIndex,
  ...rest
}: SidebarProps) => {
  const { replace } = useRouter();

  const onClickLink = () => {
    replace(
      {
        pathname: "/music-marketplace",
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <Box
      transition="3s ease"
      bg={"#0D164D"}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      boxShadow={"2xl"}
      {...rest}
    >
      <Flex
        h="66px"
        borderBottomWidth={1}
        borderBottomColor="yellow.400"
        alignItems="center"
        mx="4"
        justifyContent="space-between"
      >
        <Image
          py={"3"}
          h={"full"}
          fit="contain"
          w={"full"}
          cursor="pointer"
          onClick={onClickLink}
          alt="logo"
          src="/logo.png"
        />
        <CloseButton
          display={{ base: "flex", md: "none" }}
          color={"white"}
          bg={"yellow.400"}
          onClick={onClose}
        />
      </Flex>
      {data.map((link, index) => (
        <NavItem
          key={link.name}
          isSelect={index == selectIndex}
          link={link.link}
          icon={link.icon}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  link: string;
  isSelect: boolean;
}

const NavItem = ({ icon, children, isSelect, link, ...rest }: NavItemProps) => {
  const { replace } = useRouter();

  const onClickLink = () => {
    replace(
      {
        pathname: link,
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <Link
      href={"#"}
      onClick={onClickLink}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        px="4"
        mx="4"
        my={"2"}
        py={"2"}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isSelect ? "#C2A822" : "transparent"}
        color={"white"}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="18" as={icon} />}
        <Text fontFamily={"mono"} fontWeight={"bold"}>
          {children}
        </Text>
      </Flex>
    </Link>
  );
};

interface AppNavProps extends FlexProps {
  onOpen: () => void;
}

const AppNav = ({ onOpen }: AppNavProps) => {
  const { replace } = useRouter();

  const address = useAddress();
  const disconnect = useDisconnect();

  return (
    <Stack
      position={"fixed"}
      right={0}
      left={0}
      ml={{ base: 0, md: 60 }}
      p={{ base: 1, md: 3 }}
      py={{ base: 2, md: 3 }}
      bg={"#0D164DEE"}
      direction={"row"}
      borderBottomWidth={2.5}
      borderColor={"yellow.400"}
      zIndex={10}
      justifyContent={"space-between"}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        color={"white"}
        bg={"transparent"}
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <InputGroup w={["100%", "70%", "65%", "60%", "50%", "35%"]}></InputGroup>

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
            <>
              <Stack
                cursor="pointer"
                p="4"
                borderTopWidth={1}
                borderTopColor="rgba(0, 0, 0, 0.1)"
                borderBottomColor="rgba(0, 0, 0, 0.1)"
                borderBottomWidth={1}
                _hover={{
                  bg: "rgba(0, 0, 0, 0.1)",
                }}
                alignItems="center"
                direction="row"
                onClick={() => {
                  if (address)
                    replace(
                      {
                        pathname: `/music/address/${address}`,
                      },
                      undefined,
                      {
                        shallow: true,
                      }
                    );
                }}
              >
                <FaUser />
                <Text fontFamily={"mono"}>My Profile</Text>
              </Stack>
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
            </>
          )}
        </PopoverContent>
      </Popover>
    </Stack>
  );
};

export default Sidebar;
