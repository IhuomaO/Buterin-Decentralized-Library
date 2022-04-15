import Web3 from 'web3'
export const isValidAddress = (address) => {
  try {
    const web3 = new Web3()
    web3.utils.toChecksumAddress(address)
    return true
  } catch (error) {
    return false
  }
}