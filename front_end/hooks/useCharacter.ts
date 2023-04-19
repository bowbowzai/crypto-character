import { useQuery } from "@tanstack/react-query";
import useCryptoCharacter from "./useCryptoCharacter";
import { Character } from "@/types/TCharacter";

const useCharacter = (onSuccess: (character: Character) => void) => {
  const contract = useCryptoCharacter();

  return useQuery({
    queryKey: ["getCharacter"],
    queryFn: () => contract.getCharacter(),
    onSuccess: onSuccess,
  });
};

export default useCharacter;
