// import your node modules
const express = require('express');

const cors = require('cors');

const port = 3333;
const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.send('<h1>Server Running...</h1>');
});

//************************** GET ALL POSTS *************************/
server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json({ success: true, posts });
    })
    .catch(err => {
      res.status(err.code).json({ success: false, message: err.message });
    });
});

//************************** GET SPECIFIC POST *********************/
server.get('/api/posts/:id', (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (post.length > 0) {
        res.status(200).json({ success: true, post });
      } else {
        res.status(404).json({
          success: false,
          message: 'The post with the specified ID does not exist.',
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

//************************** CREATE NEW POST *********************/
server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents };

  if (!title || !contents) {
    return res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.',
    });
  }
  db.insert(newPost)
    .then(post => {
      res.status(201).json({ success: true, newPost, post });
    })
    .catch(err => {
      res.status(500).json({
        error: 'There was an error while saving the post to the database.',
      });
    });
});

//************************** DELETE SPECIFIC POST *********************/
server.delete('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  db.remove(postId)
    .then(deleted => {
      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'The post with the specified ID does not exist.',
        });
      } else {
        res
          .status(200)
          .json({ success: true, message: 'Post deleted!', deleted })
          .end();
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The post could not be removed' });
    });
});

//************************** UPDATES POST *********************/
server.put('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  const { title, contents } = req.body;
  const changes = { title, contents };

  db.update(postId, changes)
    .then(updatedPost => {
      if (!updatedPost) {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      } else if (!req.body) {
        res
          .status(400)
          .json({
            errorMessage: 'Please provide title and contents for the post.',
          });
      } else {
        res
          .status(200)
          .json({ success: true, message: 'Post Updated', changes });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The post information could not be modified.' });
    });
});

server.listen(port, () => {
  console.log('\n*** Running on Port 3333 ***\n');
});
