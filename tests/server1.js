/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
const express = require('express');

const server1 = express();

server1.get('/manifest.json', function(req, res) {
  res.json({msg: 'Web server'});
});
server1.listen(88, function() {
  console.log('Web server listening on port 88');
});
