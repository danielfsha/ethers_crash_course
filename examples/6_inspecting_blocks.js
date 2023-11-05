const { ethers } = require('ethers')

const INFURA_KEY = ''
const provider = new ethers.providers.JsonRpcProvider(
    `https://sepolia.infura.io/v3/${INFURA_KEY}`
)

const main = async () => {
    // latest block
    const block = await provider.getBlockNumber()
    
    console.log("Latest Block: ", block)

    const blockInfo = await provider.getBlock(block)
    console.log(blockInfo)

    // get transaction under a block
    const { transactions } = await provider.getBlockWithTransactions(block)
    console.log(transactions[0])
}

main()