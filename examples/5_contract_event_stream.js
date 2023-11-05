const { ethers } = require('ethers')

const INFURA_KEY = ''
const provider = new ethers.providers.JsonRpcProvider(
    `https://sepolia.infura.io/v3/${INFURA_KEY}`
)

// token info
const address = '0x779877A7B0D9E8603169DdbD7836e478b4624789' // DAI Contract
const ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",

    "event Transfer(address indexed from, address indexed to, uint amount)"
];

const contract = new ethers.Contract(address, ABI, provider)

const main = async () => {
    // querying without to and from block
    // can make u hit ur rate limit
    // cuz it would be listening to millions events
    // contract.queryFilter('Transfer', from_block, latest_block)
    const block = await provider.getBlockNumber()
    const transferEvent = await contract.queryFilter('Transfer', block - 10, block)
    console.log(transferEvent)
}

main()