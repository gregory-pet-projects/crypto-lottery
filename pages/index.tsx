import AdminControls from "@/components/AdminControls";
import CountdownTimer from "@/components/CountdownTimer";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import Login from "@/components/Login";
import { useLotteryContract } from "@/hooks/useLotteryContract";
import { BigNumber, ethers } from "ethers";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { toast } from "react-hot-toast";

const convertToEtherPrice = (price: number): number =>
  price && Number(ethers.utils.formatEther(price.toString()));

const CURRENCY = "MATIC";
const priceView = (price: number) =>
  `${convertToEtherPrice(price)} ${CURRENCY}`;

const performContractOperation = async (
  notification: string,
  callback: () => Promise<any>,
  successMessage: string
) => {
  try {
    const data = await callback();
    toast.success(successMessage, { id: notification });
    console.info("contract call success", data);
  } catch (err) {
    toast.error("Whoops something went wrong!", { id: notification });
    console.error("contract call failure", err);
  }
};

const Home: NextPage = () => {
  const {
    address,
    expiration,
    isLoadingContract,
    currentWinningReward,
    remainingTickets,
    isLoadingExpiration,
    ticketPrice,
    ticketCommission,
    BuyTickets,
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
  } = useLotteryContract();
  const [quantity, setQuantity] = useState<number>(1);
  const isTicketsExpired = expiration?.toString() < Date.now().toString();
  const [userTickets, setUserTickets] = useState<number>(0);

  useEffect(() => {
    if (!tickets) return;

    const totalTickets: string[] = tickets;
    const noOfUserTickets = totalTickets.reduce(
      (total, ticketAddress) => (ticketAddress === address ? total + 1 : total),
      0
    );
    setUserTickets(noOfUserTickets);
  }, [tickets, address]);

  const handleBuyTickets = async () => {
    if (!ticketPrice) return;
    const notification = toast.loading("Buying your tickets...");

    const callback = async () => {
      //FIXME
      const totalPrice = (
        Number(ethers.utils.formatEther(ticketPrice)) * quantity
      ).toString();
      const payValue = ethers.utils.parseEther(totalPrice);
      const data = await BuyTickets(payValue);
    };

    await performContractOperation(
      notification,
      callback,
      "Tickets purchased successfully!"
    );
  };

  const onWithdrawWinnings = async () => {
    const notification = toast.loading("Withdraw winning...");
    await performContractOperation(
      notification,
      () => WithdrawWinnings({ args: [{}] }),
      "Winning withdraw successfully!"
    );
  };

  const drawWinner = async () => {
    const notification = toast.loading("Picking a Lucky Winner.");
    await performContractOperation(
      notification,
      () => DrawWinnerTicket({}),
      "A Winner has been selected!"
    );
  };

  const onWithdrawCommission = async () => {
    const notification = toast.loading("Withdrawing commission...");
    await performContractOperation(
      notification,
      () => WithdrawCommission({}),
      "Your commission has been withdrawn successfully!"
    );
  };

  const onRestartDraw = async () => {
    const notification = toast.loading("Restarting draw...");
    await performContractOperation(
      notification,
      () => restartDraw({}),
      "Draw restart successfully!"
    );
  };

  const onRefundAll = async () => {
    const notification = toast.loading("Refunding all...");
    await performContractOperation(
      notification,
      () => RefundAll({}),
      "All refunded successfully!"
    );
  };

  if (!address) {
    return <Login />;
  }

  if (isLoadingContract) {
    return <Loading />;
  }

  return (
    <div className="bg-[#091b18] min-h-screen flex flex-col">
      <Head>
        <title>Lottery</title>
      </Head>
      <div className="flex-1">
        <Header />
        <Marquee className="bg-[#0a1f1c] p-5 mb-5" gradient={false} speed={100}>
          <div className="flex space-x-10 mx-10">
            <h4 className="text-white font-bold">Last Winner: {lastWinner}</h4>
            <h4 className="text-white font-bold">
              Previous winnings: {priceView(lastWinnerAmount)}
            </h4>
          </div>
        </Marquee>

        {lotteryOperator === address && (
          <div className="flex justify-center">
            <AdminControls
              operatorTotalCommission={priceView(operatorTotalCommission)}
              drawWinner={drawWinner}
              onWithdrawCommission={onWithdrawCommission}
              onRestartDraw={onRestartDraw}
              onRefundAll={onRefundAll}
            />
          </div>
        )}

        {winnings > 0 && (
          <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5">
            <button
              onClick={onWithdrawWinnings}
              className="p-5 bg-gradient-to-b from-orange-500 to-emerald-600 animate-pulse text-center rounded-xl w-full"
            >
              <p className="font-bold">Winner Winner Chicken Dinner!</p>
              <p>Total Winnings: {priceView(winnings)}</p>
              <br />
              <p className="font-semibold">Click here to withdraw</p>
            </button>
          </div>
        )}

        <div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5">
          <div className="stats-container">
            <h1 className="text-5xl text-white font-semibold text-center">
              The Next Draw
            </h1>
            <div className="flex justify-between p-2 space-x-2">
              <div className="stats">
                <h2 className="text-sm">Total Pool</h2>
                <p className="text-xl">{priceView(currentWinningReward)}</p>
              </div>
              <div className="stats">
                <h2 className="text-sm">Tickets Remaining</h2>
                <p className="text-xl">{remainingTickets?.toNumber()}</p>
              </div>
            </div>
            <div className="mt-5 mb-3">
              <CountdownTimer
                expiration={expiration}
                isLoadingExpiration={isLoadingExpiration}
              />
            </div>
          </div>

          <div className="stats-container space-y-2">
            <div className="stats-container">
              <div className="flex justify-between items-center text-white pb-2">
                <h2>Price per ticket</h2>
                <p>{priceView(ticketPrice)}</p>
              </div>
              <div className="flex text-white items-center space-x-2 bg-[#091b18] border-[#004337] border p-4">
                <p>TICKETS</p>
                <input
                  type="number"
                  className="flex w-full bg-transparent text-right outline-none"
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2 mt-5">
                <div className="flex items-center justify-between text-emerald-300 text-xs italic font-extrabold">
                  <p>Total cost of tickets</p>
                  <p>{convertToEtherPrice(ticketPrice) * quantity}</p>
                </div>
                <div className="flex items-center justify-between text-emerald-300 text-xs italic">
                  <p>Service fees</p>
                  <p>{priceView(ticketCommission)}</p>
                </div>
                <div className="flex items-center justify-between text-emerald-300 text-xs italic">
                  <p>+ Network Fees</p>
                  <p>TBC</p>
                </div>
              </div>
              <button
                onClick={handleBuyTickets}
                disabled={
                  isTicketsExpired || remainingTickets?.toNumber() === 0
                }
                className="mt-5 w-full bg-gradient-to-br from-orange-500 to-emerald-600 px-10 py-5 rounded-md 
              text-white shadow-xl disabled:from-gray-600 disabled:to-gray-100 
              disabled:cursor-not-allowed disabled:text-gray-100"
              >
                Buy tickets
              </button>
            </div>
            {userTickets > 0 && (
              <div className="stats">
                <p className="text-lg mb-2">
                  You have {userTickets} Tickets in this draw
                </p>
                <div className="flex max-w-sm flex-wrap gap-2">
                  {Array(userTickets)
                    .fill("")
                    .map((_, idx) => (
                      <p
                        key={idx}
                        className="text-emerald-300 h-20 w-12 bg-emerald-500/30 rounded-lg flex flex-shrink-0 items-center justify-center text-xs italic"
                      >
                        {idx + 1}
                      </p>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
