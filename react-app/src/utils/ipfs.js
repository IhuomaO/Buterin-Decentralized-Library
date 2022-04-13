import React, { Component, useState } from "react";
import { create } from "ipfs-http-client";
import { web3, contract } from "./contract";
import storehash from "./storehash";

const Ipfs = () => {
  const [buffer, setBuffer] = useState(null);
  const [Cid, setCid] = useState(null);

  const client = create();

  const captureFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const files = event.target.files;
    files.forEach((file) => {
      let reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => convertToBuffer(reader);
    });
  };

  const convertToBuffer = (reader) => {
    const buffer = Buffer.from(reader.result);
    setBuffer(buffer);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    console.log("Sending from Metamask account: " + accounts[0]);

    const { cid } = await client.add(buffer);
    console.log(cid);
    setCid(cid);

    await contract.methods._upload(cid).send({
      from: accounts[0],
    });
  };

  return <div></div>;
};

export default Ipfs;
