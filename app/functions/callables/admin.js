const functions = require('firebase-functions');

const { syncAllUser } = require('../utils/nfts');

const syncAll = functions.https.onCall(async (data, context) => {
  try {
    functions.logger.log('syncAll', { data });

    await syncAllUser();

    return true;
  } catch (err) {
    functions.logger.error('Error in syncAll', err.message);
    throw new functions.https.HttpsError('Something is wrong', err.message);
  }
});

module.exports = {
  syncAll,
};
