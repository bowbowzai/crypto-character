import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { ethers } from "hardhat"
import {
    clothStyleURIs,
    developmentChains,
    eyeStyleURIs,
    hairStyleURIs,
    mouthStyleURIs,
    networkConfig,
} from "../helper-hardhat-config"

const deployCryptoCharacter: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    var abi = require("../build/CryptoCharacterYul.abi.json").abi
    var bytecode = require("../build/CryptoCharacterYul.bytecode")

    const CryptoCharacterYulContract = await ethers.getContractFactory(
        abi,
        bytecode
    )
    const cryptoCharacterYul = await CryptoCharacterYulContract.deploy()
    await cryptoCharacterYul.deployed()

    console.log(
        `Crypto Character Yul Contract was deployed to ${cryptoCharacterYul.address}`
    )
}

export default deployCryptoCharacter
deployCryptoCharacter.tags = ["all", "cryptoCharacter", "yul"]
