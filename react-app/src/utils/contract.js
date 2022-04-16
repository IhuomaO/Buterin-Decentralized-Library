import Web3 from "web3";
import { abi } from "./abi";

let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const address = "0x653857eCaB380c458206C19142310C1a0cA1683F";

const contract = new web3.eth.Contract(abi, address);

export { contract, web3 };
