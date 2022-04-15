import Web3 from "web3";
import { abi } from "./abi";

const web3 = new Web3(window.web3.currentProvider);

if (window.ethereum) {
  try {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((res) => {})
      .catch((err) => console.log(err));
    //   localStorage.setItem("account", accounts[0]);
    //   console.log("Successfully connected to " + accounts[0]);
  } catch (error) {
    console.log("Error connecting..");
  }
} else {
  alert("metamask not detected");
}
const address = "0x3d40bd7697A00Bd604A31Cb95242359eD3Fdc417";

const contract = new web3.eth.Contract(abi, address);
export { contract, web3 };
