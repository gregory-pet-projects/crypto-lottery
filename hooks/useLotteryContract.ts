import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";

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
  const { data: tickets } = useContractRead(contract, "getTickets");

  const { mutateAsync: BuyTickets, isLoading: isLoadingBuyTickets } =
    useContractWrite(contract, "BuyTickets");

    const { data: winnings } = useContractRead(
      contract,
      "getWinningsForAddress",
      [address]
    );

    const { data: ticketPrice } = useContractRead(contract, "ticketPrice");

    const { mutateAsync: WithdrawWinnings } = useContractWrite(
      contract,
      "WithdrawWinnings"
    );

    const { data: lastWinner } = useContractRead(contract, "lastWinner");
    const { data: lastWinnerAmount } = useContractRead(
      contract,
      "lastWinnerAmount"
    );

    const { data: lotteryOperator } = useContractRead(
      contract,
      "lotteryOperator"
    );

    const { data: operatorTotalCommission } = useContractRead(
      contract,
      "operatorTotalCommission"
    );

    const { mutateAsync: DrawWinnerTicket } = useContractWrite(
      contract,
      "DrawWinnerTicket"
    );
    const { mutateAsync: RefundAll } = useContractWrite(contract, "RefundAll");
    const { mutateAsync: restartDraw } = useContractWrite(
      contract,
      "restartDraw"
    );
    const { mutateAsync: WithdrawCommission } = useContractWrite(
      contract,
      "WithdrawCommission"
    );

    return {
      contract,
      address,
      remainingTickets,
      currentWinningReward,
      ticketCommission,
      expiration,
      isLoadingExpiration,
      ticketPrice,
      isLoadingContract,
      BuyTickets,
      isLoadingBuyTickets,
      tickets,
      winnings,
      WithdrawWinnings,
      lastWinner,
      lastWinnerAmount,
      lotteryOperator,
      operatorTotalCommission,
      DrawWinnerTicket,
      RefundAll,
      restartDraw,
      WithdrawCommission,
    };
};
