import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { assert, expect } from "chai"
import { deployments, ethers, network } from "hardhat"
import { developmentChains } from "../../helper-hardhat-config"
import { CryptoCharacter } from "../../typechain-types"
import {
    hairStyleURIs,
    eyeStyleURIs,
    mouthStyleURIs,
    clothStyleURIs,
} from "../../helper-hardhat-config"

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Crypto Character Unit Test", function () {
          const initialBid = ethers.utils.parseEther("0.001").toString()
          const minimum = ethers.utils.parseEther("0.001").toString()

          let cryptoCharacter: CryptoCharacter
          let accounts: SignerWithAddress[] = []
          let deployer: SignerWithAddress
          let player: SignerWithAddress

          beforeEach(async () => {
              await deployments.fixture(["all"])
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              player = accounts[1]

              cryptoCharacter = await ethers.getContract("CryptoCharacter")
          })

          describe("constructor", function () {
              it("should initialize successfully", async () => {
                  const owner = await cryptoCharacter.getOwner()
                  const character = await cryptoCharacter.getCharacter()
                  // owner
                  assert.equal(owner, deployer.address)

                  // minimum bid amount
                  const minimumBidAmount = (
                      await cryptoCharacter.getMinimumBidAmount()
                  ).toString()

                  assert.equal(minimumBidAmount, minimum)

                  // hair
                  assert.equal(character.hair.styleURI, hairStyleURIs[0])
                  assert.equal(character.hair.owner, deployer.address)
                  assert.equal(character.hair.highestBid.toString(), initialBid)

                  // eye
                  assert.equal(character.eye.styleURI, eyeStyleURIs[0])
                  assert.equal(character.eye.owner, deployer.address)
                  assert.equal(character.eye.highestBid.toString(), initialBid)

                  // mouth
                  assert.equal(character.mouth.styleURI, mouthStyleURIs[0])
                  assert.equal(character.mouth.owner, deployer.address)
                  assert.equal(
                      character.mouth.highestBid.toString(),
                      initialBid
                  )

                  // cloth
                  assert.equal(character.cloth.styleURI, clothStyleURIs[0])
                  assert.equal(character.cloth.owner, deployer.address)
                  assert.equal(
                      character.cloth.highestBid.toString(),
                      initialBid
                  )
              })
          })

          describe("selectNewHairStyle", function () {
              it("should revert if access index out of bound", async () => {
                  expect(
                      cryptoCharacter.selectNewHairStyle("-1", {
                          value: minimum,
                      })
                  ).to.be.revertedWithCustomError(
                      cryptoCharacter,
                      "CryptoCharacter__AccessOutOfBound"
                  )
                  expect(
                      cryptoCharacter.selectNewHairStyle("4", {
                          value: minimum,
                      })
                  ).to.be.revertedWithCustomError(
                      cryptoCharacter,
                      "CryptoCharacter__AccessOutOfBound"
                  )
              })
              it("should revert if didnt send enough eth", async () => {
                  expect(
                      cryptoCharacter.selectNewHairStyle("2", {
                          value: ethers.utils.parseEther("0.0001"),
                      })
                  ).to.be.revertedWithCustomError(
                      cryptoCharacter,
                      "CryptoCharacter__InsufficientBidAmount"
                  )
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
                  assert.equal(character.hair.styleURI, hairStyleURIs[2])
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
                  ).to.be.revertedWithCustomError(
                      cryptoCharacter,
                      "CryptoCharacter__AccessOutOfBound"
                  )
                  expect(
                      cryptoCharacter.selectNewEyeStyle("4", {
                          value: minimum,
                      })
                  ).to.be.revertedWithCustomError(
                      cryptoCharacter,
                      "CryptoCharacter__AccessOutOfBound"
                  )
              })
              it("should revert if didnt send enough eth", async () => {
                  expect(
                      cryptoCharacter.selectNewEyeStyle("2", {
                          value: ethers.utils.parseEther("0.0001"),
                      })
                  ).to.be.revertedWithCustomError(
                      cryptoCharacter,
                      "CryptoCharacter__InsufficientBidAmount"
                  )
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
                  assert.equal(character.eye.styleURI, eyeStyleURIs[2])
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
                  ).to.be.revertedWithCustomError(
                      cryptoCharacter,
                      "CryptoCharacter__AccessOutOfBound"
                  )
                  expect(
                      cryptoCharacter.selectNewMouthStyle("4", {
                          value: minimum,
                      })
                  ).to.be.revertedWithCustomError(
                      cryptoCharacter,
                      "CryptoCharacter__AccessOutOfBound"
                  )
              })
              it("should revert if didnt send enough eth", async () => {
                  expect(
                      cryptoCharacter.selectNewMouthStyle("2", {
                          value: ethers.utils.parseEther("0.0001"),
                      })
                  ).to.be.revertedWithCustomError(
                      cryptoCharacter,
                      "CryptoCharacter__InsufficientBidAmount"
                  )
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
                  assert.equal(character.mouth.styleURI, mouthStyleURIs[2])
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
                  ).to.be.revertedWithCustomError(
                      cryptoCharacter,
                      "CryptoCharacter__AccessOutOfBound"
                  )
                  expect(
                      cryptoCharacter.selectNewClothStyle("4", {
                          value: minimum,
                      })
                  ).to.be.revertedWithCustomError(
                      cryptoCharacter,
                      "CryptoCharacter__AccessOutOfBound"
                  )
              })
              it("should revert if didnt send enough eth", async () => {
                  expect(
                      cryptoCharacter.selectNewClothStyle("2", {
                          value: ethers.utils.parseEther("0.0001"),
                      })
                  ).to.be.revertedWithCustomError(
                      cryptoCharacter,
                      "CryptoCharacter__InsufficientBidAmount"
                  )
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
                  assert.equal(character.cloth.styleURI, clothStyleURIs[2])
                  assert.equal(
                      character.cloth.highestBid.toString(),
                      ethers.utils.parseEther("0.003").toString()
                  )
              })
          })

          describe("addNewHairStyle", function () {
              const newStyleURI = "ipfs://newhairstyleuri"
              it("should revert if the style uri is existed", async () => {
                  expect(
                      cryptoCharacter.addNewHairStyle(hairStyleURIs[0])
                  ).to.be.revertedWithCustomError(
                      cryptoCharacter,
                      "CryptoCharacter__StyleExisted"
                  )
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
              })
              it("should emit NewStyleAdded event", async () => {
                  expect(cryptoCharacter.addNewHairStyle(newStyleURI)).to.emit(
                      cryptoCharacter,
                      "NewStyleAdded"
                  )
              })
          })

          describe("addNewEyeStyle", function () {
              const newStyleURI = "ipfs://neweyestyleuri"
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
              const newStyleURI = "ipfs://newmouthstyleuri"
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
              const newStyleURI = "ipfs://newclothstyleuri"
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

          it("getHairStyleURIs", async () => {
              const hairURIs = await cryptoCharacter.getHairStyleURIs()
              assert.equal(hairURIs.toString(), hairStyleURIs.toString())
          })

          it("getEyeStyleURIs", async () => {
              const eyeURIs = await cryptoCharacter.getEyeStyleURIs()
              assert.equal(eyeURIs.toString(), eyeStyleURIs.toString())
          })

          it("getMouthStyleURIs", async () => {
              const mouthURIs = await cryptoCharacter.getMouthStyleURIs()
              assert.equal(mouthURIs.toString(), mouthStyleURIs.toString())
          })

          it("getClothStyleURIs", async () => {
              const clothURIs = await cryptoCharacter.getClothStyleURIs()
              assert.equal(clothURIs.toString(), clothStyleURIs.toString())
          })
      })
