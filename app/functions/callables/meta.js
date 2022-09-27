const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors({ origin: true }));

app.get('/meta/:id', (req, res) => {
  const url = `https://staging-topseven.web.app/metadata/${req.params.id}.json`;

  res.setHeader('Content-Type', 'application/json');
  fetch(url, { method: 'Get' })
    .then((res) => res.json())
    .then((json) => {
      res.status(200).json(json);
    });
});

module.exports = functions.https.onRequest(app);
