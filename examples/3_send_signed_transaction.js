const { ethers } = require('ethers')

const INFURA_KEY = ''
const provider = new ethers.providers.JsonRpcProvider(
    `https://sepolia.infura.io/v3/${INFURA_KEY}`
)

const sender_address = "0x635B49dd6425DB47aD056AA0c2232c0214B93D9a"
const recipient_address = "0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e"

const sender_private_key = "3d184a5279aaa8c5ccd44b20013ba72b46459f0aa147645e242be3ebc2b646c5"

const sendTransaction = async() => {
    const senderBalanceBeforeTx = await provider.getBalance(sender_address)
    const recipientBalanceBeforeTx = await provider.getBalance(recipient_address)

    console.log("Sender balance before TX :", ethers.utils.formatEther(senderBalanceBeforeTx))
    console.log("Recipient balance before TX :", ethers.utils.formatEther(recipientBalanceBeforeTx))

    // 1. create wallet
    // 2. send transaction
    // 3. mine transaction - wait till it excute
    const wallet = new ethers.Wallet(sender_private_key, provider)

    const tx = await wallet.sendTransaction({
        to: recipient_address,
        value: ethers.utils.parseEther("0.001")
    })

    await tx.wait()
    console.log(tx)

    const senderBalanceAfterTx = await provider.getBalance(sender_address)
    const recipientBalanceAfterTx = await provider.getBalance(recipient_address)
    console.log('Sender balance after TX: ', ethers.utils.formatEther(senderBalanceAfterTx))
    console.log('Recipient balance after TX: ', ethers.utils.formatEther(recipientBalanceAfterTx))
}

sendTransaction()