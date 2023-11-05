const { ethers } = require('ethers')

const INFURA_KEY = ''
const provider = new ethers.providers.JsonRpcProvider(
    `https://sepolia.infura.io/v3/${INFURA_KEY}`
)

const address = '0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e'

const fetchBalance = async () => {
    const balance = await provider.getBalance(address)

    console.log(`balance of ${address}: ${ethers.utils.formatEther(balance)} ETH`)
}


fetchBalance()