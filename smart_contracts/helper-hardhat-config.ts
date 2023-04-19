const { ethers } = require("hardhat")

export interface networkConfigItem {
    blockConfirmations: number
}

export interface networkConfigInfo {
    [key: number]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
    31337: {
        blockConfirmations: 1,
    },
    1337: {
        blockConfirmations: 1,
    },
    11155111: {
        blockConfirmations: 5,
    },
    5: {
        blockConfirmations: 5,
    },
    80001: {
        blockConfirmations: 5,
    },
}

export const developmentChains = ["hardhat", "localhost"]

export const hairStyleURIs = [
    "ipfs://bafkreig5p3mpyledidlwxbwds3of4vsidd3zjv5636qicrtr6ir2l3mc6e",
    "ipfs://bafkreiapvipunndozdf6jfxwtdaxwp7dpleb6c4i6eikikdipfx7wfegoa",
    "ipfs://bafkreigf5zd2gpusrntyfc7sgczydbupdfdkfq6vkp45efwv337wdudvfm",
    "ipfs://bafkreigr2frw6svioij5p4ocef7xivp4ypntoy7ip7gc7g2xerlbrwvp7i",
]

export const eyeStyleURIs = [
    "ipfs://bafkreiej4g3i6i3an5neg7xtb6rmlwaamaod6r2hes5jzitl4loyfp62qi",
    "ipfs://bafkreiazgxyeqzbgszc5owhhousmjoja44xgcvmtmiy5cmu4wcu5z32t3u",
    "ipfs://bafkreiaddwxbezl5qtuelyz7rpwojmpcbraddzxboocaaxeuevoh4z5pci",
    "ipfs://bafkreihfo4iywxnwc3yqconsixmuhaydsd2t2gfzndgt472fia4hutdope",
]

export const mouthStyleURIs = [
    "ipfs://bafkreibk2cwy2lufcu7w6j3vsxh4x4ekeomadmiyl6tc2n2u37mn7kqy6y",
    "ipfs://bafkreidsjdswrrmrxq6s7q33jffhwbqu2t4xk6gpp2kh4srv4cewt45x5u",
    "ipfs://bafkreibix6v3uh5swzsotvhl6ekyex7e2i3dnyr6nr7oczqslt26yhyj4e",
    "ipfs://bafkreicclmbfexoq5bh7yz5hmwh6bd6kcthz35na7g55i2jl45mdzxgele",
]

export const clothStyleURIs = [
    "ipfs://bafkreigsjt6rz5c4oap63x64jaozuwcrkvsanlg4b3jfex7jqkp6s7jdhi",
    "ipfs://bafybeidgqn4midditffdrb65qobygtyuahc6kxxbhgar5rpavnot5bcy6q",
    "ipfs://bafybeidx44u3hph5ylg2zr3gc7ebvekg67w2g2fsaf57feilzg6d5lm4y4",
    "ipfs://bafybeidlpqohqk7oatjqpayzqplrmihjs5hk2xec4vh7bgl3tkdaly5v2e",
]
