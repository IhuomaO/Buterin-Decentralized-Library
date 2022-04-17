// import { disconnect } from "process";

export async function requestAccount() {
  console.log("requesting account..");
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      window.localStorage.setItem("account", accounts[0]);
      console.log("Successfully connected to " + accounts[0]);
    } catch (error) {
      console.log("Error connecting..");
    }
  } else {
    alert("metamask not detected");
  }
}
