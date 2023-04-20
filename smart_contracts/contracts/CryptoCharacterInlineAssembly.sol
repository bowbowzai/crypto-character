// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../node_modules/hardhat/console.sol";

/// @title CryptoCharacter
/// @author Ng Ju Peng
/// @notice Track ownership of each part of the character
contract CryptoCharacterInlineAssembly {
    struct CharacterPartOwnership {
        string styleURI;
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
        string uri,
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
        uint256 characterSlot = 0;
        assembly {
            sstore(0, caller())
            characterSlot := sload(s_character.slot)
        }
        console.log("Character slot ", characterSlot);

        // initialize the character
        s_character = Character({
            hair: CharacterPartOwnership({
                styleURI: _hairStyleURIs[0],
                owner: msg.sender,
                highestBid: 0.001 ether
            }),
            eye: CharacterPartOwnership({
                styleURI: _eyeStyleURIs[0],
                owner: msg.sender,
                highestBid: 0.001 ether
            }),
            mouth: CharacterPartOwnership({
                styleURI: _mouthStyleURIs[0],
                owner: msg.sender,
                highestBid: 0.001 ether
            }),
            cloth: CharacterPartOwnership({
                styleURI: _clothStyleURIs[0],
                owner: msg.sender,
                highestBid: 0.001 ether
            })
        });
        s_hairStyleURIs = _hairStyleURIs;
        s_eyeStyleURIs = _eyeStyleURIs;
        s_mouthStyleURIs = _mouthStyleURIs;
        s_clothStyleURIs = _clothStyleURIs;
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
        s_character.hair = CharacterPartOwnership({
            styleURI: s_hairStyleURIs[_index],
            owner: msg.sender,
            highestBid: msg.value
        });
        emit UpdateCharacterStyle(
            "hair",
            msg.sender,
            s_hairStyleURIs[_index],
            msg.value
        );
    }

    /// @notice gain the ownership of character's eye and use the index in s_eyeStyleURIs as eye outfit
    function selectNewEyeStyle(uint256 _index)
        external
        payable
        isValidIndex(_index, s_eyeStyleURIs)
        isEnoughBidAmount(s_character.eye)
    {
        s_character.eye = CharacterPartOwnership({
            styleURI: s_eyeStyleURIs[_index],
            owner: msg.sender,
            highestBid: msg.value
        });
        emit UpdateCharacterStyle(
            "eye",
            msg.sender,
            s_eyeStyleURIs[_index],
            msg.value
        );
    }

    /// @notice gain the ownership of character's mouth and use the index in s_mouthStyleURIs as mouth outfit
    function selectNewMouthStyle(uint256 _index)
        external
        payable
        isValidIndex(_index, s_mouthStyleURIs)
        isEnoughBidAmount(s_character.mouth)
    {
        s_character.mouth = CharacterPartOwnership({
            styleURI: s_mouthStyleURIs[_index],
            owner: msg.sender,
            highestBid: msg.value
        });
        emit UpdateCharacterStyle(
            "mouth",
            msg.sender,
            s_mouthStyleURIs[_index],
            msg.value
        );
    }

    /// @notice gain the ownership of character's cloth and use the index in s_clothStyleURIs as cloth outfit
    function selectNewClothStyle(uint256 _index)
        external
        payable
        isValidIndex(_index, s_clothStyleURIs)
        isEnoughBidAmount(s_character.cloth)
    {
        s_character.cloth = CharacterPartOwnership({
            styleURI: s_clothStyleURIs[_index],
            owner: msg.sender,
            highestBid: msg.value
        });
        emit UpdateCharacterStyle(
            "cloth",
            msg.sender,
            s_clothStyleURIs[_index],
            msg.value
        );
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
