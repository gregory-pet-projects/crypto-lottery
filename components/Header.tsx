import React from "react";
import NavButton from "./NavButton";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import { useAddress, useDisconnect } from "@thirdweb-dev/react";

const Header = ({}) => {
  const address = useAddress();
  const disconnect = useDisconnect();

  const addresssPreview = address
    ? `${address?.substring(0, 5)}...${address?.substring(
        address?.length,
        address?.length - 5
      )}`
    : "...";
  return (
    <header className="grid grid-cols-2 md:grid-cols-5 justify-between items-center p-5">
      <div className="flex items-center space-x-2">
        <img
          className="rounded-full h-20 w-20"
          src="https://pbs.twimg.com/profile_images/1514275943300284417/2Ubgzfgg_400x400.jpg"
          alt="avatar"
        />
        <div>
          <h1 className="text-lg text-white font-bold">PAPAFAM DRAW</h1>
          <p className="text-xs text-emerald-500 truncate">
            User: {addresssPreview}
          </p>
        </div>
      </div>

      <div className="hidden md:flex md:col-span-3 items-center justify-center rounded-md">
        <div className="bg-[#0a1f1c] p-4 space-x-2">
          <NavButton isActive title="Buy Tickets" />
          <NavButton onClick={disconnect} title="Logout" />
        </div>
      </div>

      <div className="flex flex-col ml-auto text-right">
        <Bars3BottomRightIcon className="h-8 w-8 mx-auto text-white cursor-pointer" />
      </div>
      <span className="md:hidden">
        <NavButton onClick={disconnect} title="Logout" />
      </span>
    </header>
  );
};

export default Header;
