// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";

contract TopSevenPlayer is Initializable, ERC721Upgradeable, ERC721EnumerableUpgradeable, OwnableUpgradeable, UUPSUpgradeable {
    bool public IS_FREE_MINT;
    uint256[] private mintedIds;

    event Log(uint256 amount, uint256 gas);
    event ResultsFromCall(bool success, bytes data);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() initializer public {
        __ERC721_init("TopSevenPlayer", "TSP");
        __Ownable_init();
        __UUPSUpgradeable_init();
        IS_FREE_MINT = true;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://staging-topseven.web.app/meta/";
    }

    function safeMint(address to, uint256 tokenId) public payable {
        require(!_exists(tokenId), "Token is minted");
        if (!IS_FREE_MINT) {
            uint256 overall = tokenId % 1000;
            uint256 divideBy = 80;
            if (overall >= 90) {
                divideBy = 20;
            } else if (overall >= 80) {
                divideBy = 40;
            } 
            uint256 price = overall * 1000000000000000000 / divideBy;

            require(msg.value >= price, "Need to send more MATIC");
        }
        _safeMint(to, tokenId);
        mintedIds.push(tokenId);

        emit Log(msg.value, gasleft());
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}

    function getMintedIds() external view returns (uint256[] memory) {
        return mintedIds;
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, 'No amount left to withdraw');

        (bool success, bytes memory data) = (msg.sender).call{value: balance}('');
        require(success, 'Withdrawal failed');
        emit Log(balance, gasleft());
        emit ResultsFromCall(success, data);
    }

    function setIsFreeMint(bool _isFreeMint) public onlyOwner {
        IS_FREE_MINT = _isFreeMint;
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
