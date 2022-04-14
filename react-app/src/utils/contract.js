import Web3 from "web3";
import {abi} from "./abi";

const web3 = new Web3(window.web3.currentProvider);

const address = "0x3f8c5Ceb89b4E363aCCB7B9771F48E277E3Cc4e1";

const contract = new web3.eth.Contract( abi, address);
export { contract, web3 };
