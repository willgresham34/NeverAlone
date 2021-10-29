const router = require ('express').Router();
const{ Post, User } = require('../../models');
// const withAuth = require('../../utils/auth');

router.post('/homepage', async (req, res) => {
    try{
        const newPost = await Post.create({
            content: req.body.content         
        });

        console.log("Post Content: ", {newPost});
        res.json(newPost); 
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;