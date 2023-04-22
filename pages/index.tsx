import Header from "@/components/Header";
import Login from "@/components/Login";
import { useAddress } from "@thirdweb-dev/react";
import { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const address = useAddress();
  if (!address) {
    return <Login />;
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
