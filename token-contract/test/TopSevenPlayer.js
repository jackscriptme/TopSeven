const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

const { ethers, upgrades } = require('hardhat');

describe('TopSevenPlayer', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployTopSevenPlayerFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const TopSevenPlayer = await ethers.getContractFactory('TopSevenPlayer');
    const token = await upgrades.deployProxy(TopSevenPlayer);
    await token.deployed();
    return { token, owner, otherAccount };
  }

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      const { token, owner } = await loadFixture(deployTopSevenPlayerFixture);

      const isAdmin = await token.hasRole(
        await token.DEFAULT_ADMIN_ROLE(),
        owner.address
      );

      expect(isAdmin).to.equal(true);
    });

    it('Should get correct balance', async function () {
      const { token } = await loadFixture(deployTopSevenPlayerFixture);
      expect(await ethers.provider.getBalance(token.address)).to.equal(0);
    });
  });
});
