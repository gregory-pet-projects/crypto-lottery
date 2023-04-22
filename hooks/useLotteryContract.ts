import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";

const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLICK_LOTTERY_CONTRACT_ADDRES ||
  "0xaA65c64a0c17477156B6513AbF2bC57ACC503524";

export const useLotteryContract = () => {
  const address = useAddress();
  const { contract, isLoading: isLoadingContract } =
    useContract(CONTRACT_ADDRESS);
  const { data: remainingTickets } = useContractRead(
    contract,
    "RemainingTickets"
  );

  const { data: currentWinningReward } = useContractRead(
    contract,
    "CurrentWinningReward"
  );
  const { data: ticketCommission } = useContractRead(
    contract,
    "ticketCommission"
  );

  const { data: expiration, isLoading: isLoadingExpiration } = useContractRead(
    contract,
    "expiration"
  );

  const { data: ticketPrice } = useContractRead(contract, "ticketPrice");
  return {
    address,
    remainingTickets,
    currentWinningReward,
    ticketCommission,
    expiration,
    isLoadingExpiration,
    ticketPrice,
    isLoadingContract,
  };
};
