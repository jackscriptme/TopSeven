const admin = require('firebase-admin');
const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');

const contractAbi = require('../abis/TopSevenPlayer.json');
const { isValidAddress } = require('./ethers');
const { accessSecretVersion } = require('./secretEnvironments');

const getContract = async () => {
  const privateKey = await accessSecretVersion('adminWalletPrivateKey');
  const rpcUrl = await accessSecretVersion('rpcUrl');
  const contractAddress = await accessSecretVersion('contractAddress');

  const provider = new Provider(privateKey, rpcUrl);
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(contractAbi.abi, contractAddress);

  return contract;
};

const sync = async (address) => {
  if (!isValidAddress(address)) throw new Error('Bad credential');
  const contract = await getContract();

  const currentPlayers = await admin
    .firestore()
    .collection('players')
    .where('owner', '==', address)
    .get();
  const currentPlayerIds = currentPlayers.docs.map((doc) => doc.id);

  const balance = await contract.methods.balanceOf(address).call();
  const indexes = Array.from({ length: Number(balance) }, (_, i) => i);
  const currentTokenIds = [];

  for (const index of indexes) {
    const tokenId = await contract.methods
      .tokenOfOwnerByIndex(address, index)
      .call();
    currentTokenIds.push(tokenId);
  }

  const addedPlayerIds = currentTokenIds.filter(
    (id) => !currentPlayerIds.includes(id)
  );
  const removedPlayerIds = currentPlayerIds.filter(
    (id) => !currentTokenIds.includes(id)
  );

  for (const addedPlayerId of addedPlayerIds) {
    const player = await admin
      .firestore()
      .collection('players')
      .doc(`${addedPlayerId}`)
      .get();

    if (player.exists) {
      await admin
        .firestore()
        .collection('players')
        .doc(`${addedPlayerId}`)
        .update({ owner: address });
    }
  }

  for (const removedPlayerId of removedPlayerIds) {
    const newOwner = await contract.methods.ownerOf(removedPlayerId).call();
    const player = await admin
      .firestore()
      .collection('players')
      .doc(`${removedPlayerId}`)
      .get();

    if (player.exists && newOwner) {
      await admin
        .firestore()
        .collection('players')
        .doc(`${removedPlayerId}`)
        .update({ owner: newOwner.toLowerCase() || null });
    }
  }
};

const syncAllUser = async () => {
  const users = await admin.firestore().collection('users').get();
  const userIds = users.docs.map((user) => user.id);

  for (const userId of userIds) {
    await sync(userId);
  }
};

const updatePlayerOwner = async (playerId) => {
  const contract = await getContract();

  const player = await admin
    .firestore()
    .collection('players')
    .doc(`${playerId}`)
    .get();
  if (!player.exists) throw new Error('Bad request');

  const owner = await contract.methods.ownerOf(playerId).call();

  if (owner) {
    await admin
      .firestore()
      .collection('players')
      .doc(`${playerId}`)
      .update({ owner: owner.toLowerCase() });
  }
};

module.exports = {
  sync,
  syncAllUser,
  updatePlayerOwner,
};
