const { ethers, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")

const TOKEN_ID = 0

async function buyItem() {
    const NftMarketplace = await ethers.getContractFactory("NftMarketplace")
    const nftMarketplace = await NftMarketplace.deploy()
    await nftMarketplace.deployed()
    const BasicNft = await ethers.getContractFactory("BasicNft")
    const basicNft = await BasicNft.deploy()
    await basicNft.deployed()
    const listing = await nftMarketplace.getListing(basicNft.address, TOKEN_ID)
    const price = listing.price.toString()
    const tx = await nftMarketplace.buyItem(basicNft.address, TOKEN_ID, { value: price })
    await tx.wait(1)
    console.log("Bought NFT.....")
    if (network.config.chainId == 31337) {
        await moveBlocks(2, (sleepAmount = 1000))
    }
}

buyItem()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
