/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
const express = require('express');
const cors = require('cors');

const server1 = express();
const server2 = express();

// server without CORS
server1.get('/manifest.json', function(req, res) {
  res.json({msg: 'Web server without CORS'});
});
server1.listen(19450, function() {
  console.log('Web server without CORS listening on port 19450');
});

// server with CORS
server2.use(cors());
server2.get('/manifest.json', function(req, res) {
  res.json({msg: 'This is CORS-enabled for all origins!'});
});
server2.listen(19451, function() {
  console.log('CORS-enabled web server listening on port 19451');
});

