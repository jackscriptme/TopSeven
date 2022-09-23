// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

const { ethers, upgrades } = require('hardhat');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  await hre.run('compile');

  // We get the contract to deploy
  const TopSevenPlayer = await ethers.getContractFactory('TopSevenPlayer');
  if (process.env.IS_UPGRADE !== 'true') {
    const mirl = await upgrades.deployProxy(TopSevenPlayer);
    await mirl.deployed();
    console.log('TopSevenPlayer is deployed to:', mirl.address);
  } else {
    const mirl = await upgrades.upgradeProxy(
      process.env.PROXY_ADDRESS,
      TopSevenPlayer
    );
    await mirl.deployed();
    console.log('TopSevenPlayer is upgraded to:', mirl.address);
  }

  const publicMinter = await ethers.getContractFactory('PublicMinter');
  const s = await publicMinter.deploy();
  console.log('PublicMinter is deployed to:', s.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
