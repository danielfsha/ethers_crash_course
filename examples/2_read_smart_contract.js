const { ethers } = require('ethers')

const INFURA_KEY = ''
const provider = new ethers.providers.JsonRpcProvider(
    `https://sepolia.infura.io/v3/${INFURA_KEY}`
)

// DAI token details
const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
const ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
]


async function readContract () {
    // address, abi, signer or provider
    const contract = new ethers.Contract(address, ABI, provider)

    const name = await contract.name()
    const symbol = await contract.symbol()
    const totalSupply = await contract.totalSupply()
    const balanceOf = await contract.balanceOf(address)


    console.log('name: ', name)
    console.log('symbol: ', symbol)
    console.log('total supply: ', totalSupply)
    console.log(`balance of ${address}: ${ethers.utils.formatEther(balanceOf)}`)
}

readContract()