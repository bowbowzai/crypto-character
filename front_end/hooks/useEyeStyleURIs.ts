import { useQuery } from "@tanstack/react-query";
import useCryptoCharacter from "./useCryptoCharacter";

const useEyeStyleURIs = (onSuccess: (hairStyleURIs: string[]) => void) => {
  const contract = useCryptoCharacter();

  return useQuery({
    queryKey: ["eyestyleURIs"],
    queryFn: () => contract.getEyeStyleURIs(),
    onSuccess: onSuccess,
  });
};

export default useEyeStyleURIs;
