const express = require('express')

const Posts = require('../data/db')

const router = express.Router()



//************************** GET ALL POSTS *************************/
router.get('/', async (req, res) => {
    Posts.find()
      .then(posts => {
        res.status(200).json({ success: true, posts });
      })
      .catch(err => {
        res.status(err.code).json({ success: false, message: err.message });
      });
  });
  
  //************************** GET SPECIFIC POST *********************/
  router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
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
  router.post('/', (req, res) => {
    const { title, contents } = req.body;
    const newPost = { title, contents };
  
    if (!title || !contents) {
      return res.status(400).json({
        errorMessage: 'Please provide title and contents for the post.',
      });
    }
    Posts.insert(newPost)
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
  router.delete('/:id', (req, res) => {
    const postId = req.params.id;
    Posts.remove(postId)
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
  router.put('/:id', (req, res) => {
    const postId = req.params.id;
    const { title, contents } = req.body;
    const changes = { title, contents };
  
    Posts.update(postId, changes)
      .then(updatedPost => {
        if (!updatedPost) {
          res
            .status(404)
            .json({ message: 'The post with the specified ID does not exist.' });
        } else if (!req.body) {
          res.status(400).json({
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

module.exports = router;