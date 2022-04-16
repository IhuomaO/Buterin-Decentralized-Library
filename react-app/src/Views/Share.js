import React, { useState } from "react";
import PropTypes from "prop-types";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { isValidAddress } from "../Utils/helpers/CheckAddress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { web3, contract } from "../Utils/contract";

function Share(props) {
  const [walletAddress, setWalletAddress] = useState("");
  const [hash, setHash] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      const isValid = isValidAddress(walletAddress);
      if (!isValid)
        return toast.error("Invalid Wallet Address", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

      const hasOnceUploadedFile = await contract.methods
        .isAnUploader(walletAddress)
        .call();
      let response;
      hasOnceUploadedFile
        ? (response = await contract.methods
            ._shareWithExisting(hash, walletAddress)
            .send({ from: accounts[0] }))
        : (response = await contract.methods
            ._shareWithNew(hash, walletAddress)
            .send({ from: accounts[0] }));
      toast.success(
        `File shared ${response.from} to ${walletAddress} successful.`
      );
      setWalletAddress("");
      setHash([]);
    } catch (error) {
      toast.warn(`${error.response}`);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-slate-300 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
        />
        <form
          className="mt-4 space-y-4 bg-white py-6 px-4 sm:px-2 lg:px-8 rounded"
          onSubmit={handleSubmit}
        >
          <Input
            label="Wallet address"
            name={"walletAddress"}
            value={walletAddress}
            placeholder={"0x...Address"}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
          <Input
            label="Hash / CID"
            name={"hash"}
            value={hash}
            placeholder={"Hash/cid of file"}
            onChange={(e) => setHash((prev) => [...prev, e.target.value])}
          />
          <Button className="mx-auto text-white" type="submit">
            Share
          </Button>
        </form>
      </div>
    </div>
  );
}

Share.propTypes = {};

export default Share;
