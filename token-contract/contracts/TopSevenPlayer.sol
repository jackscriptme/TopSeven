// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";

contract TopSevenPlayer is Initializable, ERC721Upgradeable, ERC721EnumerableUpgradeable, OwnableUpgradeable, UUPSUpgradeable {
    bool public IS_FREE_MINT;
    uint256 public BASE_PRICE;
    uint256 public LEGEND_BASE_PRICE; 
    uint256 public MIN_LEGEND_ID;

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
        BASE_PRICE = 500000000 gwei;
        LEGEND_BASE_PRICE = 1000000000 gwei;
        MIN_LEGEND_ID = 1000;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://staging-topseven.web.app/meta/";
    }

    function safeMint(address to, uint256 tokenId) public payable {
        require(!_exists(tokenId), "Token is minted");
        if (!IS_FREE_MINT) {
            if (tokenId >= MIN_LEGEND_ID) {
                require(msg.value >= LEGEND_BASE_PRICE, "Need to send more MATIC");
            } else {
                require(msg.value >= BASE_PRICE, "Need to send more MATIC");
            }
        }
        _safeMint(to, tokenId);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, 'No amount left to withdraw');

        (bool success, bytes memory data) = (msg.sender).call{value: balance}('');
        require(success, 'Withdrawal failed');
        emit ResultsFromCall(success, data);
    }

    function setIsFreeMint(bool _isFreeMint) public onlyOwner {
        IS_FREE_MINT = _isFreeMint;
    }

    function setBasePrice(uint256 _basePrice) public onlyOwner {
        BASE_PRICE = _basePrice;
    }

    function setLegendBasePrice(uint _legendBasePrice) public onlyOwner {
        LEGEND_BASE_PRICE = _legendBasePrice;
    }

    function setMinLegendId(uint256 _minLegendId) public onlyOwner {
        MIN_LEGEND_ID = _minLegendId;
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
