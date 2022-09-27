const admin = require('firebase-admin');

const meta = require('./callables/meta');
const { getCustomToken, signMessage } = require('./callables/authentication');

admin.initializeApp();

exports.meta = meta;
exports.getCustomToken = getCustomToken;
exports.signMessage = signMessage;
