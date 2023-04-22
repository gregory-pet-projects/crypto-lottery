import { useMetamask } from "@thirdweb-dev/react";

const Login = () => {
  const connectWithMetamask = useMetamask();
  return (
    <div className="bg-[#091b18] min-h-screen flex flex-col items-center justify-center text-center">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-6xl text white font-bold mb-5">Lottery Web3</h1>
        <h2 className="text-white">
          Get Started By loggin in with your Metamask
        </h2>
      </div>
      <button
        onClick={() => connectWithMetamask()}
        className="bg-white text-[#091b18] px-8 py-5 mt-10 rounded-lg shadow-lg font-bold"
      >
        Loggin with Metamask
      </button>
    </div>
  );
};

export default Login;
