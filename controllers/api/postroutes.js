const router = require ('express').Router();
const{ Post, User } = require('../../models');
// const withAuth = require('../../utils/auth');

// Creates new post
router.post('/homepage', async (req,res) => {
    // alert("before try");
    try{
        // alert("fetch works");
        const newPost = await Post.create({
            content: req.body.content
        });
        console.log("newpost ",newPost)
        res.json(newPost);
    }
    catch(err){
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;