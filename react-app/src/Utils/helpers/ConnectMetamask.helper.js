
export async function requestAccount(setWalletAddress) {
  console.log('requesting account..');
  if (window.ethereum) {
    console.log('detected');
    try {

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts", });
      console.log(accounts);
      setWalletAddress(accounts[0]);
    } catch (error) {
      console.log('Error connecting..');
    }

  } else {

    alert('metamask not detected');
  }
}