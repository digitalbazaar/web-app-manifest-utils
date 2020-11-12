/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
const express = require('express');
const cors = require('cors');

const server2 = express();

server2.use(cors());
server2.get('/manifest.json', function(req, res) {
  res.json({msg: 'This is CORS-enabled for all origins!'});
});
server2.listen(89, function() {
  console.log('CORS-enabled web server listening on port 89');
});
