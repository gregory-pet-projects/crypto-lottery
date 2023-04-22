import Header from "@/components/Header";
import Loading from "@/components/Loading";
import Login from "@/components/Login";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { NextPage } from "next";
import Head from "next/head";

const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLICK_LOTTERY_CONTRACT_ADDRES ||
  "0xaA65c64a0c17477156B6513AbF2bC57ACC503524";
const Home: NextPage = () => {
  const address = useAddress();
  const { contract, isLoading } = useContract(CONTRACT_ADDRESS);

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
      <Header />
    </div>
  );
};
export default Home;
