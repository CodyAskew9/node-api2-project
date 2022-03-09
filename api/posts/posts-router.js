// implement your posts router here
const express = require('express')
const router = express.Router()

const Post = requier('./posts-model');

router.get('/', (req, res) => {
    Post.find()
    .then((posts)) => {
        res.status(200).json(posts);
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: "The posts information could not be retrieved" });
      });
  });
  
  router.get("/:id", (req, res) => {
    Posts.findById(req.params.id)
      .then((post) => {
        if (!post) {
          res
            .status(404)
            .json({ message: "The post with the specified ID does not exist" });
        } else {
          res.status(200).json(post);
        }
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: "The post information could not be retrieved" });
      });
  });
  
  router.post("/", (req, res) => {
    const body = req.body;
    if (!body.title || !body.contents) {
      res
        .status(400)
        .json({ message: "Please provide title and contents for the post" });
    } else {
      Posts.insert(body)
        .then((post) => {
          Posts.findById(post.id)
            .then((totalPost) => {
              res.status(201).json(totalPost);
            })
            .catch((err) => {
              console.error(err.message);
            });
        })
        .catch(() => {
          res.status(500).json({
            message: "There was an error while saving the post to the database",
          });
        });
    }
  });
  
  router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body; 
      if(!body.title || !body.contents){
          res.status(400).json({ message: "Please provide title and contents for the post" })
      }
      try{
          const postId = await Posts.findById(id)
          if(!postId) {
              res.status(404).json({ message: "The post with the specified ID does not exist" })
          }
          await Posts.update(id, body)
          const updated = await Posts.findById(id)
          res.status(200).json(updated)
    } 
    catch(err){
        res.status(500).json({ message: "The post information could not be modified" })
    }
    })
  
  router.delete('/:id', async (req, res) => {
      const id = req.params.id
  
      try{
          const post = await Posts.findById(id)
          if(!post){
              res.status(404).json({ message: "The post with the specified ID does not exist" })
          } else {
              await Posts.remove(id)
              res.status(200).json(post)
          }  
      }
      catch(err){
          res.status(500).json({ message: "The post could not be removed" })           
      }
  })
  
  router.get('/:id/comments', async (req, res) => {
      const id = req.params.id
      
      try{
       const comments = await Posts.findPostComments(id) 
        if(!id){
          res.status(404).json({ message: "The post with the specified ID does not exist" })
      }
       res.status(200).json(comments)  
      }
      catch(err){
              res.status(500).json({ message: "The comments information could not be retrieved" })
          }
  })
  
  module.exports = router;
})