import { useQuery } from "@tanstack/react-query";
import useCryptoCharacter from "./useCryptoCharacter";

const useMouthStyleURIs = (onSuccess: (hairStyleURIs: string[]) => void) => {
  const contract = useCryptoCharacter();

  return useQuery({
    queryKey: ["mouthstyleURIs"],
    queryFn: () => contract.getMouthStyleURIs(),
    onSuccess: onSuccess,
  });
};

export default useMouthStyleURIs;
