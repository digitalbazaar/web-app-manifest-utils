/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const {mockManifests} = require('./mock-data.js');

const server1 = express();
const server2 = express();

// web server without CORS
server1.get('/manifest.json', function(req, res) {
  const manifest = mockManifests.basicManifest;
  res.json(manifest);
});

https.createServer({
  key: fs.readFileSync(__dirname + '/key.pem'),
  cert: fs.readFileSync(__dirname + '/cert.pem')
}, server1).listen(19450, function() {
  console.log('Web server without CORS listening on port 19450');
});

// web server with CORS
server2.use(cors());
server2.get('/basic/manifest.json', function(req, res) {
  const manifest = mockManifests.basicManifest;
  res.json(manifest);
});
server2.get('/proxy/manifest.json', function(req, res) {
  const manifest = mockManifests.basicManifest;
  res.json(manifest);
});
server2.get('/full/manifest.json', function(req, res) {
  const manifest = mockManifests.fullManifest;
  res.json(manifest);
});
server2.get('/no-icons/manifest.json', function(req, res) {
  const manifest = mockManifests.noIconsManifest;
  res.json(manifest);
});
server2.get('/no-icons/no-favicon/manifest.json', function(req, res) {
  const manifest = mockManifests.noIconsManifest;
  res.json(manifest);
});
server2.get('/no-manifest/manifest.json', function(req, res) {
  res.status(404);
  res.send('HTTPError');
});
server2.get('/no-manifest/no-favicon/manifest.json', function(req, res) {
  res.status(404);
  res.send('HTTPError');
});

server2.head('/*/no-favicon/favicon.ico', function(req, res) {
  res.status(404);
  res.send('HTTPError');
});
server2.head('/*/favicon.ico', function(req, res) {
  res.status(200);
  res.send('OK.');
});

https.createServer({
  key: fs.readFileSync(__dirname + '/key.pem'),
  cert: fs.readFileSync(__dirname + '/cert.pem')
}, server2).listen(19451, function() {
  console.log('CORS-enabled web server listening on port 19451');
});
