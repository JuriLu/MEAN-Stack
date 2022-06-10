const express = require('express')
const Post = require("../models/post");   // Mongoose PostSchema
const router = express.Router();



//POST Request
router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,         //bodyParser
    content: req.body.content      //bodyParser
  });
  post.save().then(createdPost => {       //save method provided by Mongoose
    console.log(createdPost);

    res.status(201).json(
      {
        message: 'Post Added Successfully',

        /*  REDUNDANT
        postId: createdPost._id             // send the id in frontend
         */
      })
  });

});


//GET POSTs
router.get("", (req, res, next) => {
  Post.find().then(documents => {     // Post--> mongoose postSchema (import ↑), find provided by mongoose
    res.status(200).json({         //  res.status(STATUS CODE).json(RETURN DATA IN JSON FORMAT)
      message: 'Post fetched successfully',  //   WHAT WE SEND TO THE FRONTEND: 'message'  *to post.service.ts
      posts: documents                      //    WHAT WE SEND TO THE FRONTEND: 'posts'    *to post.service.ts
    });
  });
});


//GET Single POST
router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {     //Find the single post with the id
    if (post) {                                            // check if it exists and put the relevant status codes for each
      res.status(200).json(post)
    } else {
      res.status(404).json({message: 'Post not Found'})
    }
  })
})


//UPDATE POSTS
router.put("/:id", (req, res, next) => {
  const post = new Post({                 //get a post from DB
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  })
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({message: "Update Successfully"})
  });
})


//DELETE POSTS
router.delete("/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result)
    res.status(200).json({message: 'Post Deleted'});
  })
});


module.exports = router;
