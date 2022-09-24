const functions = require('firebase-functions');

const meta = require('./callables/meta.js');

exports.meta = functions.https.onRequest(meta);
