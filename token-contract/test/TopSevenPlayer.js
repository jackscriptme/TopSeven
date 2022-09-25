const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect, assert } = require('chai');
require('chai').use(require('chai-as-promised')).should();

const { ethers, upgrades } = require('hardhat');

const BASE_PRICE = 1e18 / 2;
const LEGEND_BASE_PRICE = 1e18;

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

      const value = BASE_PRICE.toString();
      await token.safeMint(owner.address, 1, { from: owner.address, value });

      const totalSupply = await token.totalSupply();
      assert.equal(totalSupply, 1);
      const balance = await token.balanceOf(owner.address);
      assert.equal(balance, 1);
    });

    it('Mint legend successfully', async function () {
      const { token, owner } = await loadFixture(deployTopSevenPlayerFixture);
      await token.setIsFreeMint(false);

      const value = LEGEND_BASE_PRICE.toString();
      await token.safeMint(owner.address, 1000, { from: owner.address, value });

      const totalSupply = await token.totalSupply();
      assert.equal(totalSupply, 1);
      const balance = await token.balanceOf(owner.address);
      assert.equal(balance, 1);
    });

    it('Mint fail due to not enough matic', async function () {
      const { token, owner } = await loadFixture(deployTopSevenPlayerFixture);
      await token.setIsFreeMint(false);

      const value = (BASE_PRICE * 1e-3).toString();
      token
        .safeMint(owner.address, 1, { from: owner.address, value })
        .should.be.rejectedWith('Need to send more MATIC');
    });

    it('Mint legend fail due to not enough matic', async function () {
      const { token, owner } = await loadFixture(deployTopSevenPlayerFixture);
      await token.setIsFreeMint(false);

      const value = (LEGEND_BASE_PRICE * 0.9).toString();
      token
        .safeMint(owner.address, 1000, { from: owner.address, value })
        .should.be.rejectedWith('Need to send more MATIC');
    });
  });
});
