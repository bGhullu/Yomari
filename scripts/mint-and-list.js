// const { ethers, network } = require("hardhat")
// const { moveBlocks } = require("../utils/move-blocks")

// const PRICE = ethers.utils.parseEther("0.1")

// async function mintAndList() {
//     const NftMarketplace = await ethers.getContractFactory("NftMarketplace")
//     const nftMarketplace = await NftMarketplace.deploy()
//     await nftMarketplace.deployed()
//     const BasicNft = await ethers.getContractFactory("BasicNft")
//     const basicNft = await BasicNft.deploy()
//     await basicNft.deployed()
//     console.log("Minting NFT...")
//     console.log(nftMarketplace.address)
//     console.log(basicNft.address)
//     const mintTx = await basicNft.mintNft()
//     const mintTxReceipt = await mintTx.wait(1)
//     const tokenId = mintTxReceipt.events[0].args.tokenId
//     console.log("Approving NFT...")
//     const approvalTx = await basicNft.approve(nftMarketplace.address, tokenId)
//     await approvalTx.wait(1)
//     console.log("Listing NFT...")
//     const tx = await nftMarketplace.listItems(basicNft.address, tokenId, PRICE)
//     await tx.wait(1)
//     console.log("NFT Listed!")
//     if (network.config.chainId == 31337) {
//         // Moralis has a hard time if you move more than 1 at once!
//         await moveBlocks(1, (sleepAmount = 1000))
//     }
// }

// mintAndList()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error)
//         process.exit(1)
//     })

const { ethers } = require("hardhat")

const PRICE = ethers.utils.parseEther("0.1")

async function mintAndList() {
    const NftMarketplace = await ethers.getContractFactory("NftMarketplace")
    const nftMarketplace = await NftMarketplace.deploy()
    await nftMarketplace.deployed()
    const BasicNft = await ethers.getContractFactory("BasicNft")
    const basicNft = await BasicNft.deploy()
    await basicNft.deployed()
    console.log("Minting....")
    const mintTx = await basicNft.mintNft()
    const mintTxReceipt = await mintTx.wait(1)
    const tokenId = mintTxReceipt.events[0].args.tokenId
    console.log(nftMarketplace.address)
    console.log(basicNft.address)
    console.log(tokenId.toString())
    console.log("Approving Nft....")
    const approvalTx = await basicNft.approve(nftMarketplace.address, tokenId)
    await approvalTx.wait(1)
    // console.log(approvalTx)
    console.log("Listing NFT......")
    const tx = await nftMarketplace.listItems(basicNft.address, tokenId, PRICE)
    const tx1 = await tx.wait(1)
    const list = tx1.events[0].args.nftAddress
    const seller = tx1.events[0].args.seller

    // await tx.wait(1)
    console.log("Listed")
    console.log(list)
    console.log(seller)
}

// mintAndList()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.log(error)
//         process.exit(1)
//     })
