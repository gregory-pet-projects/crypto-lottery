import Header from "@/components/Header";
import Loading from "@/components/Loading";
import Login from "@/components/Login";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLICK_LOTTERY_CONTRACT_ADDRES ||
  "0xaA65c64a0c17477156B6513AbF2bC57ACC503524";
const Home: NextPage = () => {
  const address = useAddress();
  const { contract, isLoading } = useContract(CONTRACT_ADDRESS);
  const { data: remainingTickets } = useContractRead(
    contract,
    "RemainingTickets"
  );
  console.log("data", remainingTickets);
  const [quantity, setQuantity] = useState<number>(1);
  if (!address) {
    return <Login />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-[#091b18] min-h-screen flex flex-col">
      <Head>
        <title></title>
      </Head>
      <div className="flex-1">
        <Header />

        <div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5">
          {/* Draw container */}
          <div className="stats-container">
            <h1 className="text-5xl text-white font-semibold text-center">
              The Next Draw
            </h1>
            <div className="flex justify-between p-2 space-x-2">
              <div className="stats">
                <h2 className="text-sm">Total Pool</h2>
                <p className="text-xl">0.1 MATIC</p>
              </div>
              <div className="stats">
                <h2 className="text-sm">Tickets Remaining</h2>
                <p className="text-xl">{remainingTickets?.toNumber()}</p>
              </div>
            </div>
          </div>

          {/* Stats */}

          <div className="stats-container space-y-2">
            <div className="stats-container">
              <div className="flex justify-between items-center text-white pb-2">
                <h2>Price per ticket</h2>
                <p>0.01 MATIC</p>
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
                  <p>0.999</p>
                </div>
                <div className="flex items-center justify-between text-emerald-300 text-xs italic">
                  <p>Service fees</p>
                  <p>0.001 MATIC</p>
                </div>
                <div className="flex items-center justify-between text-emerald-300 text-xs italic">
                  <p>+ Network Fees</p>
                  <p>TBC</p>
                </div>
              </div>
              <button
                disabled={false}
                className="mt-5 w-full bg-gradient-to-br from-orange-500 to-emerald-600 px-10 py-5 rounded-md 
              text-white shadow-xl disabled:from-gray-600 disabled:to-gray-100 
              disabled:cursor-not-allowed disabled:text-gray-100"
              >
                Buy tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
