import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import {
    clothStyleURIs,
    developmentChains,
    eyeStyleURIs,
    hairStyleURIs,
    mouthStyleURIs,
    networkConfig,
} from "../helper-hardhat-config"
import { verify } from "../helper-functions"
import { ethers } from "hardhat"

const deployCryptoCharacter: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { deployments, getNamedAccounts, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainName = network.name
    const chainId = network.config.chainId

    const waitBlockConfirmation = networkConfig[chainId!]["blockConfirmations"]

    const args: any[] = [
        hairStyleURIs,
        eyeStyleURIs,
        mouthStyleURIs,
        clothStyleURIs,
    ]
    const cryptoCharacterInlineAssembly = await deploy(
        "CryptoCharacterInlineAssembly",
        {
            from: deployer,
            args: args,
            log: true,
            waitConfirmations: waitBlockConfirmation,
        }
    )

    if (
        !developmentChains.includes(chainName) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(cryptoCharacterInlineAssembly.address, args)
    }
}

export default deployCryptoCharacter
deployCryptoCharacter.tags = ["all", "cryptoCharacter", "inline-assembly"]
