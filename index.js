// import your node modules
// const express = require('express');
const port = 3333;
// const db = require('./data/db.js');

// add your server code starting here
const server = require('./server');

server.listen(port, () => {
  console.log('\n*** Running on Port 3333 ***\n');
});
