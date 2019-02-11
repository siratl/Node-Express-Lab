// import your node modules
const express = require('express');
const port = 3333;
const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('<h1>Server Running...</h1>');
});

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json({ success: true, posts });
    })
    .catch(err => {
      res.status(err.code).json({ success: false, message: err.message });
    });
});

server.listen(port, () => {
  console.log('\n*** Running on Port 3333 ***\n');
});
