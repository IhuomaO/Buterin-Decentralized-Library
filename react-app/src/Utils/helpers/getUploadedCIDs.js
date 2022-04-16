// import { useState } from "react";
import { web3, contract } from "../contract";



export const getListOfAllUploadedCIDS = async () => {


  const accounts = await web3.eth.getAccounts();

  console.log("Retrieving all CIDs from all accounts... ");
  const allUploadedCIDS = await contract.methods._getListOfAllUploadedCIDS().call({
    from: accounts[0],
  });
  console.log(allUploadedCIDS)
  return allUploadedCIDS

}