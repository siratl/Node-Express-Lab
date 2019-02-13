const express = require('express');

const postsRouter = require('./posts/postsRouter');

const server = express();

const cors = require('cors');

server.use(cors());

server.use(express.json());

server.use('/api/posts', postsRouter);

server.get('/', async (req, res) => {
  res.send(`
    <h1>Server Running...</h1>
    <p>Add <strong>"/api/posts"</strong> to the url to get data.</p>
  `);
});

module.exports = server;
