const admin = require('firebase-admin');
const ethers = require('ethers');

const isValidAddress = (address) => ethers.utils.isAddress(address);

const auth = async (address, signature) => {
  const user = await admin.firestore().collection('users').doc(address).get();
  const { signedMessage } = user.data();
  const decodedAddress = ethers.utils.verifyMessage(signedMessage, signature);

  const isValid = decodedAddress.toLowerCase() === address.toLowerCase();

  if (isValid) return decodedAddress.toLowerCase();

  throw new Error('Bad credential');
};

module.exports = {
  isValidAddress,
  auth,
};
