const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors({ origin: true }));

app.get('/meta/:id', async (req, res) => {
  const doc = await admin
    .firestore()
    .collection('players')
    .doc(req.params.id)
    .get();
  const { name, image, dna, attributes, createdAt } = doc.data();
  const json = {
    name,
    description: name,
    image,
    dna,
    edition: doc.id,
    date: createdAt.toMillis(),
    attributes,
  };

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(json);
});

module.exports = functions.https.onRequest(app);
