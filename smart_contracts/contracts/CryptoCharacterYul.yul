object "CryptoCharacterYul" {
    code {
         /**
         * storage layout
         * slot 0 -> owner
         * slot 1 -> styleURIIndex(hair)
         * slot 2 -> owner(hair)
         * slot 3 -> highestBid(hair)
         * slot 4 -> styleURIIndex(eye)
         * slot 5 -> owner(eye)
         * slot 6 -> highestBid(eye)
         * slot 7 -> styleURIIndex(mouth)
         * slot 8 -> owner(mouth)
         * slot 9 -> highestBid(mouth)
         * slot 10 -> styleURIIndex(cloth)
         * slot 11 -> owner(cloth)
         * slot 12 -> highestBid(cloth)
         * slot 13 -> hairStyleURIs
         * slot 14 -> eyeStyleURIs
         * slot 15 -> mouthStyleURIs
         * slot 16 -> clothStyleURIs
         * slot 17 -> minimum bid amount
         */
        sstore(0, caller())
        sstore(17, 1000000000000000)

        for { let i := 1 } lt(i, 13) { i := add(i, 3) } {
          sstore(add(i, 0), 0)
          sstore(add(i, 1), caller())
          sstore(add(i, 2), 1000000000000000)
        }

        // Deploy the contract
        datacopy(0, dataoffset("runtime"), datasize("runtime"))
        return(0, datasize("runtime"))
    }
    object "runtime" {
        code {
            // Dispatcher
            switch selector()
            case 0xcfa16e68 /* "initialize(string[],string[],string[],string[])" */ {
              require(calledByOwner())
              initialize()
            }
            case 0x357fe5ea /* "selectNewHairStyle(uint256 _index)" */ {
              isEnoughBidAmount(0)
              selectNewHairStyle(decodeAsUint(0))
            }
            case 0x81c32944 /* "selectNewEyeStyle(uint256 _index)" */ {
              isEnoughBidAmount(1)
              selectNewEyeStyle(decodeAsUint(0))
            }
            case 0x568bdbab /* "selectNewMouthStyle(uint256 _index)" */ {
              isEnoughBidAmount(2)
              selectNewMouthStyle(decodeAsUint(0))
            }
            case 0x4ac1b62b /* "selectNewClothStyle(uint256 _index)" */ {
              isEnoughBidAmount(3)
              selectNewClothStyle(decodeAsUint(0))
            }
            case 0x5a29cdc7 /* "addNewHairStyle(string _newHairStyleURI)" */ {
              require(calledByOwner())
              addNewHairStyle()
            }
            case 0x39cbdb64 /* "addNewEyeStyle(string _newEyeStyleURI)" */ {
              require(calledByOwner())
              addNewEyeStyle()
            }
            case 0x21092cd9 /* "addNewMouthStyle(string _newMouthStyleURI)" */ {
              require(calledByOwner())
              addNewMouthStyle()
            }
            case 0x3fee65ec /* "addNewClothStyle(string _newClothStyleURI)" */ {
              require(calledByOwner())
              addNewClothStyle()
            }
            case 0x893d20e8 /* "getOwner()" */ {
              returnValue(owner())
            }
            case 0x1e8237df /* "getCharacter()" */ {
              returnCharacter()
            }
            case 0xcd8832f7 /* "getMinimumBidAmount()" */  {
              returnValue(minimumBidAmount())
            }
            case 0xd4cbf5e8 /* "getHairStyleURIs()" */ {
              returnHairStyleURIs()
            }
            case 0xf740f14b /* "getEyeStyleURIs()" */ {
              returnEyeStyleURIs()
            }
            case 0x9e6aa642 /* "getMouthStyleURIs()" */ {
              returnMouthStyleURIs()
            }
            case 0x59605c6d /* "getClothStyleURIs()" */ {
              returnClothStyleURIs()
            }
            default {
                revert(0, 0)
            }

            function initialize(/*hairStyleURIs, eyeStyleURIs, mouthStyleURIs, clothStyleURIs*/) {
              for{let i := 0} lt(i, 4) {i := add(i, 1)} {
                // pointer to i string array
                let pointer := calldataload(add(mul(i, 0x20), 0x4))
                // length of string array i
                let length := calldataload(add(pointer, 0x4))

                switch i
                case 0 {
                  sstore(hairStyleURIsPos(), length)
                  mstore(0, hairStyleURIsPos())
                }
                case 1 {
                  sstore(eyeStyleURIsPos(), length)
                  mstore(0, eyeStyleURIsPos())
                }
                case 2 {
                  sstore(mouthStyleURIsPos(), length)
                  mstore(0, mouthStyleURIsPos())
                }
                case 3 {
                  sstore(clothStyleURIsPos(), length)
                  mstore(0, clothStyleURIsPos())
                }

                // hash storage location for string
                // hash store in 0x00-0x20
                mstore(0, keccak256(0, 0x20))
                let hashStorageLocation := mload(0)

                for{let j:=1} lt(j,add(length, 1)) {j:=add(j,1)} {
                    // pointer to string j in string array i
                    let stringLengthPointer := add(add(pointer, 0x4), mul(j,0x20))
                    let stringLength := calldataload(add(stringLengthPointer, 0x20))
                    let part1 := calldataload(add(stringLengthPointer, 0x40))
                    let part2 := calldataload(add(stringLengthPointer, 0x60))
                    let part3 := calldataload(add(stringLengthPointer, 0x80))

                    sstore(hashStorageLocation, stringLength)
                    sstore(add(hashStorageLocation, 1), part1)
                    sstore(add(hashStorageLocation, 2), part2)
                    sstore(add(hashStorageLocation, 3), part3)
                    hashStorageLocation := add(hashStorageLocation, 4)
                }
              }
            }
            function selectNewHairStyle(index) {
              sstore(1, index)
              sstore(2, caller())
              sstore(3, callvalue())
              let
                  signature
              := 0x4326431441db3c438d46bb147b8b9590f117e828f1a38ec9501581da2819bbf9
              mstore(0, index)
              mstore(0x20, callvalue())
              log3(0x0, 0x40, signature, "hair", caller())
            }
            function selectNewEyeStyle(index) {
              sstore(4, index)
              sstore(5, caller())
              sstore(6, callvalue())
              let
                  signature
              := 0x4326431441db3c438d46bb147b8b9590f117e828f1a38ec9501581da2819bbf9
              mstore(0, index)
              mstore(0x20, callvalue())
              log3(0x0, 0x40, signature, "eye", caller())
            }
            function selectNewMouthStyle(index) {
              sstore(7, index)
              sstore(8, caller())
              sstore(9, callvalue())
              let
                  signature
              := 0x4326431441db3c438d46bb147b8b9590f117e828f1a38ec9501581da2819bbf9
              mstore(0, index)
              mstore(0x20, callvalue())
              log3(0x0, 0x40, signature, "mouth", caller())
            }
            function selectNewClothStyle(index) {
              sstore(10, index)
              sstore(11, caller())
              sstore(12, callvalue())
              let
                  signature
              := 0x4326431441db3c438d46bb147b8b9590f117e828f1a38ec9501581da2819bbf9
              mstore(0, index)
              mstore(0x20, callvalue())
              log3(0x0, 0x40, signature, "cloth", caller())
            }
            function addNewHairStyle() {
              let hairStylesLength := hairStyleURILength()
              
              mstore(0, hairStyleURIsPos())
              mstore(0, keccak256(0, 0x20))

              let location := mload(0)

              for { let i := 0 } lt(i, hairStylesLength) { i := add(i, 1) } {
                location := add(location, 4)
              }

              // length
              let length := decodeAsUint(1)
              let firstPart := decodeAsUint(2)
              let secondPart := decodeAsUint(3)
              let thirdPart := decodeAsUint(4)

              sstore(add(location, 0), length)
              sstore(add(location, 1), firstPart)
              sstore(add(location, 2), secondPart)
              sstore(add(location, 3), thirdPart)

              sstore(hairStyleURIsPos(), add(hairStylesLength, 1))
            }
            function addNewEyeStyle() {
              let eyeStylesLength := eyeStyleURILength()
              
              mstore(0, eyeStyleURIsPos())
              mstore(0, keccak256(0, 0x20))

              let location := mload(0)

              for { let i := 0 } lt(i, eyeStylesLength) { i := add(i, 1) } {
                location := add(location, 4)
              }

              // length
              let length := decodeAsUint(1)
              let firstPart := decodeAsUint(2)
              let secondPart := decodeAsUint(3)
              let thirdPart := decodeAsUint(4)

              sstore(add(location, 0), length)
              sstore(add(location, 1), firstPart)
              sstore(add(location, 2), secondPart)
              sstore(add(location, 3), thirdPart)

              sstore(eyeStyleURIsPos(), add(eyeStylesLength, 1))
            }
            function addNewMouthStyle() {
              let mouthStylesLength := mouthStyleURILength()
              
              mstore(0, mouthStyleURIsPos())
              mstore(0, keccak256(0, 0x20))

              let location := mload(0)

              for { let i := 0 } lt(i, mouthStylesLength) { i := add(i, 1) } {
                location := add(location, 4)
              }

              // length
              let length := decodeAsUint(1)
              let firstPart := decodeAsUint(2)
              let secondPart := decodeAsUint(3)
              let thirdPart := decodeAsUint(4)

              sstore(add(location, 0), length)
              sstore(add(location, 1), firstPart)
              sstore(add(location, 2), secondPart)
              sstore(add(location, 3), thirdPart)

              sstore(mouthStyleURIsPos(), add(mouthStylesLength, 1))
            }
            function addNewClothStyle() {
              let clothStylesLength := clothStyleURILength()
              
              mstore(0, clothStyleURIsPos())
              mstore(0, keccak256(0, 0x20))

              let location := mload(0)

              for { let i := 0 } lt(i, clothStylesLength) { i := add(i, 1) } {
                location := add(location, 4)
              }

              // length
              let length := decodeAsUint(1)
              let firstPart := decodeAsUint(2)
              let secondPart := decodeAsUint(3)
              let thirdPart := decodeAsUint(4)

              sstore(add(location, 0), length)
              sstore(add(location, 1), firstPart)
              sstore(add(location, 2), secondPart)
              sstore(add(location, 3), thirdPart)

              sstore(clothStyleURIsPos(), add(clothStylesLength, 1))
            }
            function returnCharacter() {
              let pointer := mload(0x40)
              for {
                  let i := 0
              } lt(i, 13) {
                  i := add(i, 1)
              } {
                  mstore(add(pointer, mul(0x20, i)), sload(add(i, 1)))
              }

              return(pointer, mul(0x20, 12))
            }
            function returnHairStyleURIs() {
              mstore(0, hairStyleURIsPos())
              mstore(0, keccak256(0, 0x20))

              let location := mload(0)

              let pointer := mload(0x40)
              let length := hairStyleURILength()

              for { let i := 0 } lt(i, mul(length, 4)) { i := add(i, 1) } {
                mstore(add(pointer, mul(i, 0x20)), sload(add(location, i)))
              }

              return(pointer, mul(length, 0x20))
            }
            function returnEyeStyleURIs() {
              mstore(0, eyeStyleURIsPos())
              mstore(0, keccak256(0, 0x20))

              let location := mload(0)

              let pointer := mload(0x40)
              let length := eyeStyleURILength()

              for { let i := 0 } lt(i, mul(length, 4)) { i := add(i, 1) } {
                mstore(add(pointer, mul(i, 0x20)), sload(add(location, i)))

              }

              return(pointer, mul(length, 0x20))
            }
            function returnMouthStyleURIs() {
              mstore(0, mouthStyleURIsPos())
              mstore(0, keccak256(0, 0x20))

              let location := mload(0)

              let pointer := mload(0x40)
              let length := mouthStyleURILength()

              for { let i := 0 } lt(i, mul(length, 4)) { i := add(i, 1) } {
                mstore(add(pointer, mul(i, 0x20)), sload(add(location, i)))

              }

              return(pointer, mul(length, 0x20))
            }
            function returnClothStyleURIs() {
              mstore(0, clothStyleURIsPos())
              mstore(0, keccak256(0, 0x20))

              let location := mload(0)

              let pointer := mload(0x40)
              let length := clothStyleURILength()

              for { let i := 0 } lt(i, mul(length, 4)) { i := add(i, 1) } {
                mstore(add(pointer, mul(i, 0x20)), sload(add(location, i)))

              }

              return(pointer, mul(length, 0x20))
            }
          

            /* ---------- calldata decoding functions ----------- */
            function selector() -> s {
                s := div(calldataload(0), 0x100000000000000000000000000000000000000000000000000000000)
            }
            function decodeAsUint(offset) -> v {
                let pos := add(4, mul(offset, 0x20))
                if lt(calldatasize(), add(pos, 0x20)) {
                    revert(0, 0)
                }
                v := calldataload(pos)
            }
   
            /* -------- storage layout ---------- */
            function ownerPos() -> p { p := 0 }
            function hairHighestBidAmountPos() -> p {
              p := 3
            }
            function eyeHighestBidAmountPos() -> p {
              p := 6
            }
            function mouthHighestBidAmountPos() -> p {
              p := 9
            }
            function clothHighestBidAmountPos() -> p {
              p := 12
            }
            function minimumBidAmountPos() -> p {
              p := 17
            }
            function hairStyleURIsPos() -> p {
              p := 13
            }
            function eyeStyleURIsPos() -> p {
              p := 14
            }
            function mouthStyleURIsPos() -> p {
              p := 15
            }
            function clothStyleURIsPos() -> p {
              p := 16
            }

            /* -------- storage access ---------- */
            function owner() -> o {
              o := sload(ownerPos())
            }
            function minimumBidAmount() -> m {
              m := sload(minimumBidAmountPos())
            }
            function hairHighestBidAmount() -> a {
              a := sload(hairHighestBidAmountPos())
            }
            function eyeHighestBidAmount() -> a {
              a := sload(eyeHighestBidAmountPos())
            }
            function mouthHighestBidAmount() -> a {
              a := sload(mouthHighestBidAmountPos())
            }
            function clothHighestBidAmount() -> a {
              a := sload(clothHighestBidAmountPos())
            }
            function hairStyleURILength() -> l {
              l := sload(hairStyleURIsPos())
            }
            function eyeStyleURILength() -> l {
              l := sload(eyeStyleURIsPos())
            }
            function mouthStyleURILength() -> l {
              l := sload(mouthStyleURIsPos())
            }
            function clothStyleURILength() -> l {
              l := sload(clothStyleURIsPos())
            }

            /* ---------- utility functions ---------- */
            function lte(a, b) -> r {
                r := iszero(gt(a, b))
            }
            function gte(a, b) -> r {
                r := iszero(lt(a, b))
            }
            function safeAdd(a, b) -> r {
                r := add(a, b)
                if or(lt(r, a), lt(r, b)) { revert(0, 0) }
            }
            function calledByOwner() -> cbo {
                cbo := eq(owner(), caller())
            }
            function revertIfZeroAddress(addr) {
                require(addr)
            }
            function require(condition) {
                if iszero(condition) { revert(0, 0) }
            }
            function returnValue(value) {
              mstore(0, value)
              return(0, 0x20)
            }
            function isEnoughBidAmount(index) {
              let highestBid
              switch index
              case 0x0 {
                highestBid := hairHighestBidAmount()
              }
              case 0x1 {
                highestBid := eyeHighestBidAmount()
              }
              case 0x2 {
                highestBid := mouthHighestBidAmount()
              }
              case 0x3 {
                highestBid := clothHighestBidAmount()
              }
              default {
                revert(0, 0)
              }
              if iszero(
                gt(callvalue(), add(minimumBidAmount(), highestBid))
              ) {
                  revert(0, 0)
              }
            }
        }
    }
}