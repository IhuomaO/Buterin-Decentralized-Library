import React from "react";
import { useState } from "react";
import Button from "../Button";
import { requestAccount } from "../../Utils/helpers/ConnectMetamask.helper";

const Nav = ({ page, pageHandler, connectWallet }) => {
  const links = ["Home", "Upload", "Share"];
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("account")
  );

  return (
    <div className="flex h-20 items-center shadow-md p-2 sticky bg-gray-100 top-0 z-10">
      <nav className="flex flex-1 justify-center space-x-7">
        {links.map((link, index) => (
          <div
            key={index}
            className={`flex h-full font-semibold text-xl  px-4 py-2 active:text-red-300 hover:text-red-500 transition duration-300 cursor-pointer z-10 ${
              page === index && "text-red-500  "
            } `}
            onClick={() => pageHandler(index)}
          >
            {link}
          </div>
        ))}
      </nav>
      <div className="w-[550px] flex items-center ">
        {walletAddress !== null && (
          <h3 className="font-semibold">
            Wallet Address: <br />{" "}
            <span className="font-normal"> {walletAddress}</span>
          </h3>
        )}

        {walletAddress === null ? (
          <Button
            className="mx-auto"
            onClick={() => requestAccount(setWalletAddress)}
          >
            Connect
          </Button>
        ) : (
            <Button
              className="mx-auto"
              onClick={() => setWalletAddress(null)}
            >
              Disconnect
            </Button> 
        )}
      </div>
    </div>
  );
};

export default Nav;
