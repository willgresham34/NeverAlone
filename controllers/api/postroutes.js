const router = require ('express').Router();
const{ Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try{
        const postData = await Posts.findAll({
            include: User,            
        });

        const posts = postData.map((post) => post.get({ plain: true }));
    
        console.log("Homepage Posts", posts);
        //renders homepage.handlebars
        res.render('homepage', { posts ,loggedIn: req.session.loggedIn }); 
    }
    catch(err){
        console.error(err);
        res.status(500).json(err);
    }
});