const router = require ('express').Router();
const{ Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/homepage', async (req, res) => {
    try{
        const newPost = await Post.create({
            postContent: req.body.description,
            user_id: req.session.user_id           
        });

        res.json(newPost); 
    }
    catch(err){
        console.error(err);
        res.status(500).json(err);
    }
});