const express = require('express');

const router = express.Router();

const Post  = require('../models/Post');


// get all routes
router.get('/', async (req, res) => {
    try {
        const Allposts = await Post.find();
        res.json(Allposts)
    } catch (error) {
        res.json({ message:error });
    }
});

// submit new post
router.post('/', async (req, res) => {
     	
    const post = new Post({
      title : req.body.title,
      description : req.body.description 
    });

    try {
        const savePost = await post.save();
        res.json({savePost:savePost, success: `the post saved with success`});
    } catch (error) {
        res.json({ message:error,danger:'Oops this post  not saved' });
    }
    
    
});

// get the specific post by id
router.get('/:postId', async (req, res) => {
    try {
        const post_by_id = await Post.findById(req.params.postId);
    res.json(post_by_id)
    } catch (error) {
        res.json({ message:error,danger:'Oops this post  not found' });  
    }
    	
});

// delete specific post
router.delete('/:postId', async (req, res) => {
    try {
        const removed_post = await Post.remove({_id:req.params.postId});
        res.json({removed_post:removed_post,success:`the post removed with success` });
    } catch (error) {
        res.json({ message:error,danger:`Oops this post not deleted` });  
    }
     
});

// update post by id
router.patch('/:postId', async (req, res) => {
    try {
        const update_post = await Post.updateOne(
            { _id:req.params.postId}, 
            { $set:{
                title : req.body.title,
                description : req.body.description
            }},
     );

        res.json({update_post:update_post,success:`the post updated with success` });
    } catch (error) {
        res.json({ message:error,danger:`Oops this post not Updated` });  
    }
     
});






// test page specific post
router.get('/node-js', (req, res) => {
    res.send('<h1 style="color:red;">this is a specific node js posts</h1>');
});

router.get('/php', (req, res) => {
    res.send('<h1 style="color:aqua;">php programming language</h1>');
});



module.exports = router;