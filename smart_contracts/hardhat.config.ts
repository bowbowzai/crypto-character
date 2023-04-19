import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "hardhat-gas-reporter"
import "hardhat-deploy"
import dotenv from "dotenv"

dotenv.config()

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const GEORLI_URL = process.env.GEORLI_URL || ""
const MUMBAI_URL = process.env.MUMBAI_URL || ""

const config: HardhatUserConfig = {
    solidity: "0.8.18",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        georli: {
            chainId: 5,
            url: GEORLI_URL,
            accounts: [PRIVATE_KEY],
        },
        mumbai: {
            chainId: 80001,
            url: MUMBAI_URL,
            accounts: [PRIVATE_KEY],
        },
    },
    etherscan: {
        apiKey: {
            // georli: ETHERSCAN_API_KEY,
            polygonMumbai: POLYGONSCAN_API_KEY,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
            5: 0,
            137: 0,
        },
        player: {
            default: 1,
        },
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        // token: "MATIC",
    },
    mocha: {
        timeout: 400000,
    },
}

export default config
