import { Button, Stack } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { ABI_MUSIC } from "../constants/abi";
import { useModalTransaction } from "./modal-transaction";
const LinkNFT = ({ id, isBuy = true }: { id?: string; isBuy: boolean }) => {
  const router = useRouter();
  const address = useAddress();
  const { onClose } = useModalTransaction();

  return (
    <Stack mt={2}>
      <Stack
        style={{
          marginTop: "1.5rem",
        }}
        direction={"row"}
      >
        {isBuy && (
          <Button
            flex={1}
            _hover={{ bg: "#3443DD" }}
            onClick={() => {
              window.open(
                `https://testnets.opensea.io/assets/mumbai/${ABI_MUSIC.Music.address}/${id}`,
                `_blank`
              );
            }}
            color="white"
            bg="#3443A0"
          >
            View on Opensea
          </Button>
        )}
        <Button
          flex={1}
          _hover={{ bg: "#3443DD" }}
          onClick={() => {
            router.push(`/music/address/${address}?tab=${isBuy ? "1" : "0"}`);
            onClose && onClose();
          }}
          color="white"
          bg="#3443A0"
        >
          View on Profile
        </Button>
      </Stack>
    </Stack>
  );
};

export default LinkNFT;
