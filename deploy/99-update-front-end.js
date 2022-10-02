const { ethers, network } = require("hardhat")
const fs = require("fs")

const frontEndContractFile = "../nextjs-nft-marketplace/constants/networkMapping.json"

module.exports = async function () {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating frontend......")
        await updateContractAddresses()
    }
}
async function updateContractAddresses() {
    const NftMarketplace = await ethers.getContractFactory("NftMarketplace")
    const nftMarketplace = await NftMarketplace.deploy()
    const chainId = network.config.chainId.toString()
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractFile, "utf-8"))
    if (chainId in contractAddresses) {
        if (!contractAddresses[chainId]["NftMarketplace"].includes(nftMarketplace.address)) {
            contractAddresses[chainId]["NftMarketplace"].push(nftMarketplace.address)
        }
    } else {
        contractAddresses[chainId] = { NftMarketplace: [nftMarketplace.address] }
    }

    fs.writeFileSync(frontEndContractFile, JSON.stringify(contractAddresses))
}
module.exports.tags = ["all", "frontend"]
