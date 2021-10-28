const router = require('express').Router();
const { User, Post, Comments } = require('../models/');
const withAuth = require('../utils/auth');


router.get('/', async (req,res) => {
    try {
        res.render('login')
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req,res) => {
    if (req.session.loggedIn) {
        res.redirect('/homepage');
        return;
      }
    
      res.render('login');
    });

router.get('/signup', (req,res) => {
    if (req.session.loggedIn) {
        res.redirect('/homepage');
        return;
      }
    
      res.render('signup');
    });

router.get('/profile', async (req,res) => {
    try {
        res.render('profile');
    } catch(err) {
        res.status(500).json(err);
    }
})

router.get('/homepage', async (req,res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
          });
      
          const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage');
    } catch(err) {
        res.status(500).json(err);
    }
})
module.exports = router;
