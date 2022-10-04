const functions = require('firebase-functions');

const { isValidAddress } = require('../utils/ethers');
const { updatePlayerOwner, sync } = require('../utils/nfts');

const updateOwner = functions.https.onCall(async (data, context) => {
  try {
    functions.logger.log('updateOwner', { data });

    const { playerId } = data;

    await updatePlayerOwner(playerId);

    return true;
  } catch (err) {
    functions.logger.error('Error in updateOwner', err.message);
    throw new functions.https.HttpsError('Something is wrong', err.message);
  }
});

const syncData = functions.https.onCall(async (data, context) => {
  try {
    functions.logger.log('syncData', { data });

    const { address } = data;
    if (!isValidAddress(address))
      throw new Error(`Address ${address} is invalid`);

    await sync(address);

    return true;
  } catch (err) {
    functions.logger.error('Error in syncData', err.message);
    throw new functions.https.HttpsError('Something is wrong', err.message);
  }
});

module.exports = {
  updateOwner,
  syncData,
};
