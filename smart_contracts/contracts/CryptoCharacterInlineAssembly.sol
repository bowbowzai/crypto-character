// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../node_modules/hardhat/console.sol";

/// @title CryptoCharacter
/// @author Ng Ju Peng
/// @notice Track ownership of each part of the character
contract CryptoCharacterInlineAssembly {
    struct CharacterPartOwnership {
        uint256 index;
        address owner;
        uint256 highestBid;
    }

    struct Character {
        CharacterPartOwnership hair;
        CharacterPartOwnership eye;
        CharacterPartOwnership mouth;
        CharacterPartOwnership cloth;
    }

    // in order to gain the ownership of the part of the character, at least > MIN_BID_AMOUNT + character part.highest bid
    uint256 private constant MIN_BID_AMOUNT = 0.001 ether;

    address private i_owner;

    // the only character in this contract
    Character private s_character;

    // track the style ipfs uri
    string[] internal s_hairStyleURIs;
    string[] internal s_eyeStyleURIs;
    string[] internal s_mouthStyleURIs;
    string[] internal s_clothStyleURIs;

    /********************
        Events
    ********************/
    event UpdateCharacterStyle(
        string indexed part,
        address indexed bidder,
        uint256 index,
        uint256 amount
    );
    event NewStyleAdded(string uri);

    error CryptoCharacter__StyleExisted();
    error CryptoCharacter__AccessOutOfBound();

    /********************
        Modifiers
    ********************/
    modifier onlyOwner() {
        // 4E6F744F776E6572
        // NotOwner();
        address owner = i_owner;
        assembly {
            if iszero(eq(caller(), owner)) {
                mstore(0, hex"4E6F744F776E6572")
                revert(0, 0x20)
            }
        }
        _;
    }

    modifier isEnoughBidAmount(CharacterPartOwnership memory _part) {
        // 496E73756666696369656E74426964416D6F756E74
        // InsufficientBidAmount
        assembly {
            if iszero(
                gt(callvalue(), add(MIN_BID_AMOUNT, mload(add(_part, 0x40))))
            ) {
                mstore(0, hex"496E73756666696369656E74426964416D6F756E74")
                revert(0, 0x20)
            }
        }
        _;
    }

    modifier isValidIndex(uint256 _index, string[] memory _arr) {
        // 4163636573734F75744F66426F756E64
        // AccessOutOfBound
        assembly {
            let arrLength := mload(_arr)
            if or(lt(_index, 0), iszero(lt(_index, arrLength))) {
                mstore(0, hex"4163636573734F75744F66426F756E64")
                revert(0, 0x20)
            }
        }
        _;
    }

    constructor(
        string[] memory _hairStyleURIs,
        string[] memory _eyeStyleURIs,
        string[] memory _mouthStyleURIs,
        string[] memory _clothStyleURIs
    ) {
        assembly {
            sstore(0, caller())
        }

        setStrToStorage(0, _hairStyleURIs);
        setStrToStorage(1, _eyeStyleURIs);
        setStrToStorage(2, _mouthStyleURIs);
        setStrToStorage(3, _clothStyleURIs);

        /**
         * Character storage layout
         * slot 1 -> styleURIIndex(hair)✔
         * slot 2 -> owner(hair)✔
         * slot 3 -> highestBid(hair)✔
         * slot 4 -> styleURIIndex(eye)✔
         * slot 5 -> owner(eye)✔
         * slot 6 -> highestBid(eye)✔
         * slot 7 -> styleURIIndex(mouth)✔
         * slot 8 -> owner(mouth)✔
         * slot 9 -> highestBid(mouth)✔
         * slot 10 -> styleURIIndex(cloth)✔
         * slot 11 -> owner(cloth)✔
         * slot 12 -> highestBid(cloth)✔
         */
        uint256 index = 1;
        for (uint256 i = 1; i <= 4; i++) {
            // hair style uri location
            bytes32 location = keccak256(abi.encode(index));
            uint256 length;
            assembly {
                // style pointer
                let pointer
                switch i
                case 1 {
                    pointer := mload(add(_hairStyleURIs, 0x20))
                }
                case 2 {
                    pointer := mload(add(_eyeStyleURIs, 0x20))
                }
                case 3 {
                    pointer := mload(add(_mouthStyleURIs, 0x20))
                }
                case 4 {
                    pointer := mload(add(_clothStyleURIs, 0x20))
                }
                // style length
                length := or(
                    pointer,
                    hex"0000000000000000000000000000000000000000000000000000000000000001"
                )
                sstore(index, length)
                sstore(add(location, 0), mload(add(pointer, 0x20)))
                sstore(add(location, 1), mload(add(pointer, 0x40)))
                sstore(add(location, 2), mload(add(pointer, 0x60)))
            }
            index += 3;
        }
        assembly {
            // uri index
            sstore(1, 0)
            sstore(3, 0)
            sstore(7, 0)
            sstore(10, 0)

            // part owner
            sstore(2, caller())
            sstore(5, caller())
            sstore(8, caller())
            sstore(11, caller())

            // highest bid
            sstore(3, 1000000000000000) // 0.001 ETH
            sstore(6, 1000000000000000)
            sstore(9, 1000000000000000)
            sstore(12, 1000000000000000)
        }
    }

    fallback() external payable {}

    receive() external payable {}

    /********************
        Gain part ownership of the character
    ********************/

    /// @notice gain the ownership of character's hair and use the index in s_hairStyleURIs as hair outfit
    function selectNewHairStyle(uint256 _index)
        external
        payable
        isValidIndex(_index, s_hairStyleURIs)
        isEnoughBidAmount(s_character.hair)
    {
        assembly {
            sstore(1, _index)
            sstore(2, caller())
            sstore(3, callvalue())
            let
                signature
            := 0x4326431441db3c438d46bb147b8b9590f117e828f1a38ec9501581da2819bbf9
            mstore(0, _index)
            mstore(0x20, callvalue())
            log3(0x0, 0x40, signature, "hair", caller())
        }
    }

    /// @notice gain the ownership of character's eye and use the index in s_eyeStyleURIs as eye outfit
    function selectNewEyeStyle(uint256 _index)
        external
        payable
        isValidIndex(_index, s_eyeStyleURIs)
        isEnoughBidAmount(s_character.eye)
    {
        assembly {
            sstore(4, _index)
            sstore(5, caller())
            sstore(6, callvalue())
            let
                signature
            := 0x4326431441db3c438d46bb147b8b9590f117e828f1a38ec9501581da2819bbf9
            mstore(0, _index)
            mstore(0x20, callvalue())
            log3(0x0, 0x40, signature, "eye", caller())
        }
    }

    /// @notice gain the ownership of character's mouth and use the index in s_mouthStyleURIs as mouth outfit
    function selectNewMouthStyle(uint256 _index)
        external
        payable
        isValidIndex(_index, s_mouthStyleURIs)
        isEnoughBidAmount(s_character.mouth)
    {
        assembly {
            sstore(7, _index)
            sstore(8, caller())
            sstore(9, callvalue())
            let
                signature
            := 0x4326431441db3c438d46bb147b8b9590f117e828f1a38ec9501581da2819bbf9
            mstore(0, _index)
            mstore(0x20, callvalue())
            log3(0x0, 0x40, signature, "mouth", caller())
        }
    }

    /// @notice gain the ownership of character's cloth and use the index in s_clothStyleURIs as cloth outfit
    function selectNewClothStyle(uint256 _index)
        external
        payable
        isValidIndex(_index, s_clothStyleURIs)
        isEnoughBidAmount(s_character.cloth)
    {
        assembly {
            sstore(10, _index)
            sstore(11, caller())
            sstore(12, callvalue())
            let
                signature
            := 0x4326431441db3c438d46bb147b8b9590f117e828f1a38ec9501581da2819bbf9
            mstore(0, _index)
            mstore(0x20, callvalue())
            log3(0x0, 0x40, signature, "cloth", caller())
        }
    }

    /********************
        Add new outfit for each part of the character
    ********************/
    function addNewHairStyle(string memory _newHairStyleURI)
        external
        onlyOwner
    {
        if (_isStyleURIExist(_newHairStyleURI, s_hairStyleURIs)) {
            revert CryptoCharacter__StyleExisted();
        }
        assembly {
            // increase the length by 1
            sstore(s_hairStyleURIs.slot, add(sload(s_hairStyleURIs.slot), 1))
        }

        s_hairStyleURIs.push(_newHairStyleURI);
        emit NewStyleAdded(_newHairStyleURI);
    }

    function addNewEyeStyle(string memory _newEyeStyleURI) external onlyOwner {
        if (_isStyleURIExist(_newEyeStyleURI, s_eyeStyleURIs)) {
            revert CryptoCharacter__StyleExisted();
        }
        s_eyeStyleURIs.push(_newEyeStyleURI);
        emit NewStyleAdded(_newEyeStyleURI);
    }

    function addNewMouthStyle(string memory _newMouthStyleURI)
        external
        onlyOwner
    {
        if (_isStyleURIExist(_newMouthStyleURI, s_mouthStyleURIs)) {
            revert CryptoCharacter__StyleExisted();
        }
        s_mouthStyleURIs.push(_newMouthStyleURI);
        emit NewStyleAdded(_newMouthStyleURI);
    }

    function addNewClothStyle(string memory _newClothStyleURI)
        external
        onlyOwner
    {
        if (_isStyleURIExist(_newClothStyleURI, s_clothStyleURIs)) {
            revert CryptoCharacter__StyleExisted();
        }
        s_clothStyleURIs.push(_newClothStyleURI);
        emit NewStyleAdded(_newClothStyleURI);
    }

    /********************
        Private functions
    ********************/
    function _isStyleURIExist(string memory uri, string[] memory uris)
        private
        pure
        returns (bool)
    {
        for (uint256 i = 0; i < uris.length; i++) {
            if (
                keccak256(abi.encodePacked(uri)) ==
                keccak256(abi.encodePacked(uris[i]))
            ) {
                return true;
            }
        }
        return false;
    }

    // 0 -> hair
    // 1 -> eye
    // 2 -> mouth
    // 3 -> cloth
    function setStrToStorage(uint256 option, string[] memory _strs) private {
        bytes32 actualStringLocation;
        uint256 slot;
        assembly {
            // store the length of the array in hairstyle uri slot
            switch option
            case 0 {
                slot := s_hairStyleURIs.slot
            }
            case 1 {
                slot := s_eyeStyleURIs.slot
            }
            case 2 {
                slot := s_mouthStyleURIs.slot
            }
            case 3 {
                slot := s_clothStyleURIs.slot
            }
            sstore(slot, mload(_strs))
        }
        bytes32 location = keccak256(abi.encode(slot));
        for (uint256 i = 1; i <= _strs.length; i++) {
            actualStringLocation = keccak256(abi.encode(location));
            assembly {
                // the length of the string
                let pointer := mload(add(_strs, mul(0x20, i)))
                // set the lowest bit to 1 to indicate the long string
                let setLowestBit := or(
                    pointer,
                    hex"0000000000000000000000000000000000000000000000000000000000000001"
                )
                // store the length of the string in location
                sstore(location, setLowestBit)
                // store the actual string in actualStringLocation
                // ipfs hash will need 3 slot
                sstore(add(actualStringLocation, 0), mload(add(pointer, 0x20)))
                sstore(add(actualStringLocation, 1), mload(add(pointer, 0x40)))
                sstore(add(actualStringLocation, 2), mload(add(pointer, 0x60)))
                location := add(location, 1)
            }
        }
    }

    /********************
        Read Only
    ********************/
    function getOwner() external view returns (address) {
        return i_owner;
    }

    function getCharacter() external view returns (Character memory) {
        return s_character;
    }

    function getMinimumBidAmount() external pure returns (uint256) {
        return MIN_BID_AMOUNT;
    }

    function getHairStyleURIs() external view returns (string[] memory) {
        return s_hairStyleURIs;
    }

    function getEyeStyleURIs() external view returns (string[] memory) {
        return s_eyeStyleURIs;
    }

    function getMouthStyleURIs() external view returns (string[] memory) {
        return s_mouthStyleURIs;
    }

    function getClothStyleURIs() external view returns (string[] memory) {
        return s_clothStyleURIs;
    }

    function getHairStyleURI(uint256 _index)
        external
        view
        returns (string memory)
    {
        return s_hairStyleURIs[_index];
    }

    function getEyeStyleURI(uint256 _index)
        external
        view
        returns (string memory)
    {
        return s_eyeStyleURIs[_index];
    }

    function getMouthStyleURI(uint256 _index)
        external
        view
        returns (string memory)
    {
        return s_mouthStyleURIs[_index];
    }

    function getClothStyleURI(uint256 _index)
        external
        view
        returns (string memory)
    {
        return s_clothStyleURIs[_index];
    }
}
