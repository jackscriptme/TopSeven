const admin = require('firebase-admin');

const meta = require('./callables/meta');
const { getCustomToken, signMessage } = require('./callables/authentication');
const { updateOwner, syncData } = require('./callables/users');
const { syncAll } = require('./callables/admin');

admin.initializeApp();

exports.meta = meta;
exports.getCustomToken = getCustomToken;
exports.signMessage = signMessage;
exports.updateOwner = updateOwner;
exports.syncData = syncData;
exports.syncAll = syncAll;
