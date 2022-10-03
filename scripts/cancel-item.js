const { ethers, network } = require("hardhat")
const { moveBlocks, sleep } = require("../utils/move-blocks")

const TOKEN_ID = 0

async function cancel() {
    const NftMarketplace = await ethers.getContractFactory("NftMarketplace")
    const nftMarketplace = await NftMarketplace.deploy()
    await nftMarketplace.deployed()
    const BasicNft = await ethers.getContractFactory("BasicNft")
    const basicNft = await BasicNft.deploy()
    await basicNft.deployed()
    const tx = await nftMarketplace.cancelListing(basicNft.address, TOKEN_ID)
    await tx.wait(1)
    console.log("Nft canceled")
    if (network.config.chainId == "31337") {
        await moveBlocks(2, (sleepAmount = 1000))
    }
}

cancel()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
