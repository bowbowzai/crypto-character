import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { assert, expect } from "chai"
import { deployments, ethers, network } from "hardhat"
import { developmentChains } from "../../helper-hardhat-config"
import { CryptoCharacterInlineAssembly } from "../../typechain-types"
import {
    hairStyleURIs,
    eyeStyleURIs,
    mouthStyleURIs,
    clothStyleURIs,
} from "../../helper-hardhat-config"

var abi = require("../../build/CryptoCharacterYul.abi.json").abi
var bytecode = require("../../build/CryptoCharacterYul.bytecode")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Crypto Character Yul Unit Test", function () {
          const initialBid = ethers.utils.parseEther("0.001").toString()
          const minimum = ethers.utils.parseEther("0.001").toString()
          let cryptoCharacter: CryptoCharacterInlineAssembly
          let accounts: SignerWithAddress[] = []
          let deployer: SignerWithAddress
          beforeEach(async () => {
              accounts = await ethers.getSigners()
              deployer = accounts[0]

              const CryptoCharacterYulContract =
                  await ethers.getContractFactory(abi, bytecode)
              cryptoCharacter = (await CryptoCharacterYulContract.deploy(
                  hairStyleURIs,
                  eyeStyleURIs,
                  mouthStyleURIs,
                  clothStyleURIs
              )) as CryptoCharacterInlineAssembly
              await cryptoCharacter.deployed()
          })

          describe("constructor", function () {
              it("should initialize successfully", async () => {})
          })
      })
