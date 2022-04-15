export async function requestAccount(setWalletAddress) {
  console.log("requesting account..");
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      localStorage.setItem("account", accounts[0]);
      setWalletAddress(accounts[0]);
      console.log("Successfully connected to " + accounts[0]);
    } catch (error) {
      console.log("Error connecting..");
    }
  } else {
    alert("metamask not detected");
  }
}
