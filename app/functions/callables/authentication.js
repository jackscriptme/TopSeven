const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { v4 } = require('uuid');

const { isValidAddress, auth } = require('../utils/ethers');

const signMessage = functions.https.onCall(async (data, context) => {
  try {
    functions.logger.log('signMessage', { data });

    const { address } = data;
    if (!isValidAddress(address))
      throw new Error(`Address ${address} is invalid`);

    const signedMessage = `Hello ${address}, this is an unique signed message ${v4()}`;
    await admin
      .firestore()
      .collection('users')
      .doc(address)
      .set({ signedMessage }, { merge: true });

    return signedMessage;
  } catch (err) {
    functions.logger.error('Error in signMessage', err.message);
    throw new functions.https.HttpsError('Something is wrong', err.message);
  }
});

const getCustomToken = functions.https.onCall(async (data, context) => {
  try {
    functions.logger.log('getCustomToken', { data });

    const { address, signature } = data;
    const account = await auth(address, signature);

    let existedUser;
    try {
      existedUser = await admin.auth().getUser(account);
    } catch (err) {
      functions.logger.log(`Create new user for address ${address}`);
    }

    if (existedUser) {
      const customToken = await admin.auth().createCustomToken(account);
      return customToken;
    }

    await admin.auth().createUser({
      uid: account,
      email: `${account}@topseven.io`,
      emailVerified: true,
    });
    const customToken = await admin.auth().createCustomToken(account);
    await admin.firestore().collection('users').doc(account).set(
      {
        level: 1,
        username: account,
      },
      { merge: true }
    );
    return customToken;
  } catch (err) {
    functions.logger.error('Error in getCustomToken', err.message);
    throw new functions.https.HttpsError('Something is wrong', err);
  }
});

module.exports = {
  signMessage,
  getCustomToken,
};
