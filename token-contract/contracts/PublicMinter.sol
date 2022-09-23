// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/cryptography/MerkleProof.sol';

import "@openzeppelin/contracts/utils/Strings.sol";

import './TopSevenPlayer.sol';

contract PublicMinter is Ownable {
  TopSevenPlayer private token;
  address private contractAddress;
  bool public IS_FREE_MINT = false;
  uint256 public BASE_PRICE = 1000000000 gwei;

  event Log(uint256 amount, uint256 gas);

  constructor() {}

  receive() external payable {}

  fallback() external payable {}

  /**
  ***************************
  Public
  ***************************
   */

  function mint(
    address to,
    uint256 tokenId
  ) public payable {
    if (!IS_FREE_MINT) {
      require(msg.value >= BASE_PRICE, Strings.toString(BASE_PRICE));
    }
    token.mint(to, tokenId, 1, '');
    emit Log(msg.value, gasleft());
  }

  /**
  ***************************
  Customization for the contract
  ***************************
   */

  function setContractAddress(address payable _address) external onlyOwner {
    contractAddress = _address;
    token = TopSevenPlayer(_address);
  }

  function setIsFreeMint(bool isFreeMint) public onlyOwner {
    IS_FREE_MINT = isFreeMint;
  }
}
