import Web3 from "web3";

const web3 = new Web3(window.web3.currentProvider);

const address = "";
const abi = [];

const contract = web3.eth.Contract(address, abi);
export { contract, web3 };
