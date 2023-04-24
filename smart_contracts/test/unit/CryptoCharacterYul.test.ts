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
import { providers } from "ethers"
import { keccak256 } from "ethers/lib/utils"

var abi = require("../../build/CryptoCharacterYul.abi.json").abi
var bytecode = require("../../build/CryptoCharacterYul.bytecode")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Crypto Character Yul Unit Test", function () {
          const initialBid = ethers.utils.parseEther("0.001").toString()
          const minimum = ethers.utils.parseEther("0.001").toString()
          let cryptoCharacter: any
          let accounts: SignerWithAddress[] = []
          let deployer: SignerWithAddress
          beforeEach(async () => {
              accounts = await ethers.getSigners()
              deployer = accounts[0]

              const CryptoCharacterYulContract =
                  await ethers.getContractFactory(abi, bytecode)
              cryptoCharacter = await CryptoCharacterYulContract.deploy()
              await cryptoCharacter.deployed()
          })

          describe("constructor", function () {
              it("should initialize successfully", async () => {
                  const owner = await cryptoCharacter.getOwner()
                  assert.equal(owner, deployer.address)

                  // character
                  const character = await cryptoCharacter.getCharacter()

                  assert.equal(character.hair.owner, deployer.address)
                  assert.equal(
                      character.hair.highestBid.toString(),
                      ethers.utils.parseEther("0.001").toString()
                  )
                  assert.equal(character.hair.index.toString(), "0")

                  assert.equal(character.eye.owner, deployer.address)
                  assert.equal(
                      character.eye.highestBid.toString(),
                      ethers.utils.parseEther("0.001").toString()
                  )
                  assert.equal(character.eye.index.toString(), "0")

                  assert.equal(character.mouth.owner, deployer.address)
                  assert.equal(
                      character.mouth.highestBid.toString(),
                      ethers.utils.parseEther("0.001").toString()
                  )
                  assert.equal(character.mouth.index.toString(), "0")

                  assert.equal(character.cloth.owner, deployer.address)
                  assert.equal(
                      character.cloth.highestBid.toString(),
                      ethers.utils.parseEther("0.001").toString()
                  )
                  assert.equal(character.cloth.index.toString(), "0")

                  // minimun bid amount
                  const minimumBidAmount =
                      await cryptoCharacter.getMinimumBidAmount()
                  assert.equal(
                      minimumBidAmount.toString(),
                      ethers.utils.parseEther("0.001").toString()
                  )
              })
          })

          describe("initialize", function () {
              it("should initialize successfully", async () => {
                  await cryptoCharacter.initialize(
                      hairStyleURIs,
                      eyeStyleURIs,
                      mouthStyleURIs,
                      clothStyleURIs,
                      {
                          gasLimit: 30000000,
                      }
                  )
              })
          })
      })
