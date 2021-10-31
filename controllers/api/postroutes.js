const router = require ('express').Router();
const{ Post, User } = require('../../models');
const {withAuth} = require('../../utils/auth');


// Creates new post
router.post('/homepage', async (req,res) => {
    try{
        const newPost = await Post.create({
            content: req.body.content,
            user_id: req.session.userId
        });
        console.log("newpost ",newPost)
        res.json(newPost);
    }
    catch(err){
        console.error(err);
        res.status(500).json(err);
    }
});


// Changes the value of selected post in the dashboard
router.put('/profile/edit/:id', withAuth, async (req,res) => {
    try{
        const editPost = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if(editPost){
            res.status(200).end();
        }
        else{
            res.status(404).end();
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json(err);
    }
});



module.exports = router;