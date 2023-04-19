import { useQuery } from "@tanstack/react-query";
import useCryptoCharacter from "./useCryptoCharacter";

const useClothStyleURIs = (onSuccess: (hairStyleURIs: string[]) => void) => {
  const contract = useCryptoCharacter();

  return useQuery({
    queryKey: ["clothstyleURIs"],
    queryFn: () => contract.getClothStyleURIs(),
    onSuccess: onSuccess,
  });
};

export default useClothStyleURIs;
