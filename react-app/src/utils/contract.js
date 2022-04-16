import Web3 from "web3";
import { abi } from "./abi";

let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const address = "0x3d40bd7697A00Bd604A31Cb95242359eD3Fdc417";

const contract = new web3.eth.Contract(abi, address);

export { contract, web3 };
