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

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Crypto Character Inline Assembly Unit Test", function () {
          const initialBid = ethers.utils.parseEther("0.001").toString()
          const minimum = ethers.utils.parseEther("0.001").toString()
          let cryptoCharacter: CryptoCharacterInlineAssembly
          let accounts: SignerWithAddress[] = []
          let deployer: SignerWithAddress
          let player: SignerWithAddress

          beforeEach(async () => {
              await deployments.fixture(["all"])
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              player = accounts[1]

              cryptoCharacter = await ethers.getContract(
                  "CryptoCharacterInlineAssembly"
              )
          })

          describe("constructor", function () {
              it("should initialize successfully", async () => {
                  // owner
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

                  // hairstyle uris
                  const hairStyleURIsArr: string[] = []
                  let hairstyleURIsContract =
                      await cryptoCharacter.getHairStyleURIs()
                  hairstyleURIsContract.map((str) => {
                      const strAfter = str.replace(/\x00/g, "")
                      hairStyleURIsArr.push(strAfter)
                  })
                  assert.equal(
                      hairStyleURIsArr.toString(),
                      hairStyleURIs.toString()
                  )
              })
          })

          describe("selectNewHairStyle", function () {
              it("should revert if access index out of bound", async () => {
                  expect(
                      cryptoCharacter.selectNewHairStyle("-1", {
                          value: minimum,
                      })
                  ).to.be.reverted
                  expect(
                      cryptoCharacter.selectNewHairStyle("4", {
                          value: minimum,
                      })
                  ).to.be.reverted
              })
              it("should revert if didnt send enough eth", async () => {
                  expect(
                      cryptoCharacter.selectNewHairStyle("2", {
                          value: ethers.utils.parseEther("0.0001"),
                      })
                  ).to.be.reverted
              })
              it("should gain the ownership of part hair if sufficient amount is provided", async () => {
                  const tx = await cryptoCharacter
                      .connect(player)
                      .selectNewHairStyle("2", {
                          value: ethers.utils.parseEther("0.003"),
                      })
                  await tx.wait()

                  // get character
                  const character = await cryptoCharacter.getCharacter()

                  assert.equal(character.hair.owner, player.address)
                  assert.equal(character.hair.index.toString(), "2")
                  assert.equal(
                      character.hair.highestBid.toString(),
                      ethers.utils.parseEther("0.003").toString()
                  )
              })
          })

          describe("selectNewEyeStyle", function () {
              it("should revert if access index out of bound", async () => {
                  expect(
                      cryptoCharacter.selectNewEyeStyle("-1", {
                          value: minimum,
                      })
                  ).to.be.reverted
                  expect(
                      cryptoCharacter.selectNewEyeStyle("4", {
                          value: minimum,
                      })
                  ).to.be.reverted
              })
              it("should revert if didnt send enough eth", async () => {
                  expect(
                      cryptoCharacter.selectNewEyeStyle("2", {
                          value: ethers.utils.parseEther("0.0001"),
                      })
                  ).to.be.reverted
              })
              it("should gain the ownership of part eye if sufficient amount is provided", async () => {
                  const tx = await cryptoCharacter
                      .connect(player)
                      .selectNewEyeStyle("2", {
                          value: ethers.utils.parseEther("0.003"),
                      })
                  await tx.wait()

                  // get character
                  const character = await cryptoCharacter.getCharacter()

                  assert.equal(character.eye.owner, player.address)
                  assert.equal(character.eye.index.toString(), "2")
                  assert.equal(
                      character.eye.highestBid.toString(),
                      ethers.utils.parseEther("0.003").toString()
                  )
              })
          })

          describe("selectNewMouthStyle", function () {
              it("should revert if access index out of bound", async () => {
                  expect(
                      cryptoCharacter.selectNewMouthStyle("-1", {
                          value: minimum,
                      })
                  ).to.be.reverted
                  expect(
                      cryptoCharacter.selectNewMouthStyle("4", {
                          value: minimum,
                      })
                  ).to.be.reverted
              })
              it("should revert if didnt send enough eth", async () => {
                  expect(
                      cryptoCharacter.selectNewMouthStyle("2", {
                          value: ethers.utils.parseEther("0.0001"),
                      })
                  ).to.be.reverted
              })
              it("should gain the ownership of part mouth if sufficient amount is provided", async () => {
                  const tx = await cryptoCharacter
                      .connect(player)
                      .selectNewMouthStyle("2", {
                          value: ethers.utils.parseEther("0.003"),
                      })
                  await tx.wait()

                  // get character
                  const character = await cryptoCharacter.getCharacter()

                  assert.equal(character.mouth.owner, player.address)
                  assert.equal(character.mouth.index.toString(), "2")
                  assert.equal(
                      character.mouth.highestBid.toString(),
                      ethers.utils.parseEther("0.003").toString()
                  )
              })
          })

          describe("selectNewClothStyle", function () {
              it("should revert if access index out of bound", async () => {
                  expect(
                      cryptoCharacter.selectNewClothStyle("-1", {
                          value: minimum,
                      })
                  ).to.be.reverted
                  expect(
                      cryptoCharacter.selectNewClothStyle("4", {
                          value: minimum,
                      })
                  ).to.be.reverted
              })
              it("should revert if didnt send enough eth", async () => {
                  expect(
                      cryptoCharacter.selectNewClothStyle("2", {
                          value: ethers.utils.parseEther("0.0001"),
                      })
                  ).to.be.reverted
              })
              it("should gain the ownership of part cloth if sufficient amount is provided", async () => {
                  const tx = await cryptoCharacter
                      .connect(player)
                      .selectNewClothStyle("2", {
                          value: ethers.utils.parseEther("0.003"),
                      })
                  await tx.wait()

                  // get character
                  const character = await cryptoCharacter.getCharacter()

                  assert.equal(character.cloth.owner, player.address)
                  assert.equal(character.cloth.index.toString(), "2")
                  assert.equal(
                      character.cloth.highestBid.toString(),
                      ethers.utils.parseEther("0.003").toString()
                  )
              })
          })

          describe("addNewHairStyle", function () {
              const newStyleURI =
                  "ipfs://aaaaaeig5p3mpyledidlwxbwds3of4vsidd3zjv5636qicrtr6ir222r56e"
              it("should revert if the style uri is existed", async () => {
                  expect(cryptoCharacter.addNewHairStyle(hairStyleURIs[0])).to
                      .be.reverted
              })
              it("should push to the hairstyle URIs successfully if the URI doesnt exist", async () => {
                  // check the uri length first
                  let hairStyleURIsArr =
                      await cryptoCharacter.getHairStyleURIs()

                  assert.equal(hairStyleURIsArr.length, 4)
                  // push to the s_hairStyleURIs
                  await cryptoCharacter.addNewHairStyle(newStyleURI)

                  // check whether the s_hairStyleURIs has 5 URIs
                  hairStyleURIsArr = await cryptoCharacter.getHairStyleURIs()
                  assert.equal(hairStyleURIsArr.length, 5)

                  await cryptoCharacter.addNewHairStyle(
                      "ipfs://bafkreibk2cwy2lufcu7w6j3vsxh4x4ekeomadmiyl6tc2n2u37mn7kqy6y"
                  )
                  hairStyleURIsArr = await cryptoCharacter.getHairStyleURIs()
              })
          })

          describe("addNewEyeStyle", function () {
              const newStyleURI =
                  "ipfs://aaaaaeig5p3mpyledidlwxbwds3of4vsidd3zjv5636qicrtr6ir222r56e"
              it("should revert if the style uri is existed", async () => {
                  expect(
                      cryptoCharacter.addNewEyeStyle(eyeStyleURIs[0])
                  ).to.be.revertedWithCustomError(
                      cryptoCharacter,
                      "CryptoCharacter__StyleExisted"
                  )
              })
              it("should push to the eyestyle URIs successfully if the URI doesnt exist", async () => {
                  // check the uri length first
                  let eyeStyleURIsArr = await cryptoCharacter.getEyeStyleURIs()

                  assert.equal(eyeStyleURIsArr.length, 4)

                  // push to the s_eyeStyleURIs
                  await cryptoCharacter.addNewEyeStyle(newStyleURI)

                  // check whether the s_hairStyleURIs has 5 URIs
                  eyeStyleURIsArr = await cryptoCharacter.getEyeStyleURIs()

                  assert.equal(eyeStyleURIsArr.length, 5)
              })
              it("should emit NewStyleAdded event", async () => {
                  expect(cryptoCharacter.addNewHairStyle(newStyleURI)).to.emit(
                      cryptoCharacter,
                      "NewStyleAdded"
                  )
              })
          })

          describe("addNewMouthStyle", function () {
              const newStyleURI =
                  "ipfs://aaaaaeig5p3mpyledidlwxbwds3of4vsidd3zjv5636qicrtr6ir222r56e"
              it("should revert if the style uri is existed", async () => {
                  expect(
                      cryptoCharacter.addNewMouthStyle(mouthStyleURIs[0])
                  ).to.be.revertedWithCustomError(
                      cryptoCharacter,
                      "CryptoCharacter__StyleExisted"
                  )
              })
              it("should push to the mouthstyle URIs successfully if the URI doesnt exist", async () => {
                  // check the uri length first
                  let mouthStyleURIsArr =
                      await cryptoCharacter.getMouthStyleURIs()

                  assert.equal(mouthStyleURIsArr.length, 4)

                  // push to the s_eyeStyleURIs
                  await cryptoCharacter.addNewMouthStyle(newStyleURI)

                  // check whether the s_hairStyleURIs has 5 URIs
                  mouthStyleURIsArr = await cryptoCharacter.getMouthStyleURIs()

                  assert.equal(mouthStyleURIsArr.length, 5)
              })
              it("should emit NewStyleAdded event", async () => {
                  expect(cryptoCharacter.addNewMouthStyle(newStyleURI)).to.emit(
                      cryptoCharacter,
                      "NewStyleAdded"
                  )
              })
          })

          describe("addNewClothStyle", function () {
              const newStyleURI =
                  "ipfs://aaaaaeig5p3mpyledidlwxbwds3of4vsidd3zjv5636qicrtr6ir222r56e"
              it("should revert if the style uri is existed", async () => {
                  expect(
                      cryptoCharacter.addNewClothStyle(clothStyleURIs[0])
                  ).to.be.revertedWithCustomError(
                      cryptoCharacter,
                      "CryptoCharacter__StyleExisted"
                  )
              })
              it("should push to the clothstyle URIs successfully if the URI doesnt exist", async () => {
                  // check the uri length first
                  let clothStyleURIsArr =
                      await cryptoCharacter.getEyeStyleURIs()

                  assert.equal(clothStyleURIsArr.length, 4)

                  // push to the s_eyeStyleURIs
                  await cryptoCharacter.addNewClothStyle(newStyleURI)

                  // check whether the s_hairStyleURIs has 5 URIs
                  clothStyleURIsArr = await cryptoCharacter.getClothStyleURIs()

                  assert.equal(clothStyleURIsArr.length, 5)
              })
              it("should emit NewStyleAdded event", async () => {
                  expect(cryptoCharacter.addNewClothStyle(newStyleURI)).to.emit(
                      cryptoCharacter,
                      "NewStyleAdded"
                  )
              })
          })
      })
