import { useQuery } from "@tanstack/react-query";
import useCryptoCharacter from "./useCryptoCharacter";

const useHairStyleURIs = (onSuccess: (hairStyleURIs: string[]) => void) => {
  const contract = useCryptoCharacter();

  return useQuery({
    queryKey: ["hairstyleURIs"],
    queryFn: () => contract.getHairStyleURIs(),
    onSuccess: onSuccess,
  });
};

export default useHairStyleURIs;
