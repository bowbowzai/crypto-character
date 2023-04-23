const path = require("path")
const fs = require("fs")
const solc = require("solc")

const outputPath = path.resolve(
    __dirname,
    "..",
    "build",
    "CryptoCharacterYul.bytecode.json"
)

const inputPath = path.resolve(
    __dirname,
    "..",
    "contracts",
    "CryptoCharacterYul.yul"
)
const source = fs.readFileSync(inputPath, "utf-8")

var input = {
    language: "Yul",
    sources: {
        "CryptoCharacterYul.yul": {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["evm.bytecode"],
            },
        },
    },
}

const compiledContract = solc.compile(JSON.stringify(input))
const bytecode =
    JSON.parse(compiledContract).contracts["CryptoCharacterYul.yul"]
        .CryptoCharacterYul.evm.bytecode.object

fs.writeFile(outputPath, JSON.stringify(bytecode), (err) => {})
console.log(bytecode)
console.log("done")
