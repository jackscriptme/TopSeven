const { assert } = require('chai');
require('chai').use(require('chai-as-promised')).should();

const { ethers, upgrades } = require('hardhat');

const BASE_PRICE = 1e18;

describe('PublicMinter', function () {
  let accounts, token, minter;
  beforeEach(async function () {
    accounts = await ethers.getSigners();
    const TopSevenPlayer = await ethers.getContractFactory('TopSevenPlayer');
    const PublicMinter = await ethers.getContractFactory('PublicMinter');

    token = await upgrades.deployProxy(TopSevenPlayer);
    minter = await PublicMinter.deploy();

    await minter.setContractAddress(token.address);
    await token.grantRole(await token.MINTER_ROLE(), minter.address);
  });

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const tokenAddress = token.address;
      assert.notEqual(tokenAddress, 0x0);
      assert.notEqual(tokenAddress, '');
      assert.notEqual(tokenAddress, null);
      assert.notEqual(tokenAddress, undefined);

      const minterAddress = minter.address;
      assert.notEqual(minterAddress, 0x0);
      assert.notEqual(minterAddress, '');
      assert.notEqual(minterAddress, null);
      assert.notEqual(minterAddress, undefined);
    });
  });

  describe('minting', async () => {
    it('mint successfully', async () => {
      const account = accounts[0];

      const value = BASE_PRICE.toString();
      await minter.mint(account.address, 1, {
        from: account.address,
        value,
      });

      const totalSupply = await token.totalSupply(1);
      assert.equal(totalSupply, 1);
      const balance = await token.balanceOf(account.address, 1);
      assert.equal(balance, 1);
    });
  });
});
