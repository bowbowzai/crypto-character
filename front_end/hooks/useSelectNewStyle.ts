import { useMutation } from "@tanstack/react-query";
import useCryptoCharacter from "./useCryptoCharacter";

const useSelectNewStyle = (
  onSuccess: (transactionHash: string) => void,
  onError: () => void
) => {
  const contract = useCryptoCharacter();

  return useMutation({
    mutationFn: contract.selectNewStyle,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useSelectNewStyle;
