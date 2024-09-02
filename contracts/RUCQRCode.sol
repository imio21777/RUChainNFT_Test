//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract RUCQRCode is ERC721URIStorage {
    // serve as a counter for the token ID, tracing the number of NFT minted
    uint256 private _tokenIds;
    uint256 public constant MAX_SUPPLY = 1000;

    // contract constructor, initializing the name and symbol
    constructor() ERC721("RUCQRCode", "NFT") {}

    // only owner of the contract can call this mint function
    function mintNFT(
        address recipient,
        string memory tokenURI
    ) public returns (uint256) {
        require(_tokenIds < MAX_SUPPLY, "Max supply reached");
        _tokenIds += 1;
        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
}
