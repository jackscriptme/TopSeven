const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect, assert } = require('chai');
require('chai').use(require('chai-as-promised')).should();

const { ethers, upgrades } = require('hardhat');

const BASE_PRICE = 1e18 / 2;
const LEGEND_BASE_PRICE = 1e18;

const getTokenPrice = (tokenId) => {
  const overall = tokenId % 1000;
  let divideBy = 80;
  if (overall >= 90) {
    divideBy = 20;
  } else if (overall >= 80) {
    divideBy = 40;
  }

  const price = (overall * 1e18) / divideBy;
  return price;
};

describe('TopSevenPlayer', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployTopSevenPlayerFixture() {
    const [owner] = await ethers.getSigners();
    const TopSevenPlayer = await ethers.getContractFactory('TopSevenPlayer');
    const token = await upgrades.deployProxy(TopSevenPlayer);
    await token.deployed();
    return { token, owner };
  }

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      const { token, owner } = await loadFixture(deployTopSevenPlayerFixture);

      expect(await token.owner()).to.equal(owner.address);
    });

    it('Should get correct balance', async function () {
      const { token } = await loadFixture(deployTopSevenPlayerFixture);
      expect(await ethers.provider.getBalance(token.address)).to.equal(0);
    });
  });

  describe('Mint', function () {
    it('Free mint successfully', async function () {
      const { token, owner } = await loadFixture(deployTopSevenPlayerFixture);
      await token.safeMint(owner.address, 1);

      const totalSupply = await token.totalSupply();
      assert.equal(totalSupply, 1);
      const balance = await token.balanceOf(owner.address);
      assert.equal(balance, 1);
    });

    it('Mint duplicated', async function () {
      const { token, owner } = await loadFixture(deployTopSevenPlayerFixture);
      await token.safeMint(owner.address, 1);

      const totalSupply = await token.totalSupply();
      assert.equal(totalSupply, 1);

      token
        .safeMint(owner.address, 1)
        .should.be.rejectedWith('Token is minted');
    });

    it('Mint successfully', async function () {
      const { token, owner } = await loadFixture(deployTopSevenPlayerFixture);
      await token.setIsFreeMint(false);

      const tokenId = 1090;
      const price = getTokenPrice(tokenId);
      const value = price.toString();
      await token.safeMint(owner.address, tokenId, {
        from: owner.address,
        value,
      });

      const totalSupply = await token.totalSupply();
      assert.equal(totalSupply, 1);
      const balance = await token.balanceOf(owner.address);
      assert.equal(balance, 1);
      const tokenOwner = await token.ownerOf(tokenId);
      assert.equal(tokenOwner, owner.address);
    });

    it('Mint fail due to not enough matic', async function () {
      const { token, owner } = await loadFixture(deployTopSevenPlayerFixture);
      await token.setIsFreeMint(false);

      const tokenId = 1090;
      const price = getTokenPrice(tokenId);
      const value = (price - 1).toString();
      token
        .safeMint(owner.address, tokenId, { from: owner.address, value })
        .should.be.rejectedWith('Need to send more MATIC');
    });
  });
});
