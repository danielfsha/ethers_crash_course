const { ethers } = require('ethers')

const INFURA_KEY = ''
const provider = new ethers.providers.JsonRpcProvider(
    `https://sepolia.infura.io/v3/${INFURA_KEY}`
)

const sender_address = "0x635B49dd6425DB47aD056AA0c2232c0214B93D9a"
const recipient_address = "0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e"

const sender_private_key = "3d184a5279aaa8c5ccd44b20013ba72b46459f0aa147645e242be3ebc2b646c5"


// token info
const address = '0x779877A7B0D9E8603169DdbD7836e478b4624789'
const ABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
]

const main = async() => {
    const wallet = new ethers.Wallet(sender_private_key, provider)
    const contract = new ethers.Contract(address, ABI, provider)

    const balance = await contract.balanceOf(sender_address)
    console.log('Reading from', sender_address)
    console.log("Balance: ", ethers.utils.formatEther(balance))

    const contractWithWallet = contract.connect(wallet)
    const tx = await contractWithWallet.transfer(recipient_address, balance)
    await tx.wait()

    console.log(tx)

    const senderBalanceAfterTx = await contract.balanceOf(sender_address)
    const recipientBalanceAfterTx = await contract.balanceOf(recipient_address)
    console.log('Sender balance after TX: ', ethers.utils.formatEther(senderBalanceAfterTx))
    console.log('Recipient balance after TX: ', ethers.utils.formatEther(recipientBalanceAfterTx))
} 

main()