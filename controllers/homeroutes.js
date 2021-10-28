const router = require('express').Router();
const { User, Post, Comments } = require('../models/');
const withAuth = require('../utils/auth');
const quoteList = require('../db/quotes.json');

// gets home page if logged in
router.get('/', withAuth, async (req,res) => {
    try {
        
        res.redirect('/homepage');
    } catch(err) {
        res.status(500).json(err);
    }
});

// get sign up page -> if logged in, go to home page
router.get('/sign-up', async (req,res) => {
    try {
        if(req.session.loggedIn){
            res.redirect('/homepage');
        }
        res.render('signup', {logged_in: req.session.loggedIn});
    }catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req,res) => {
   try {
     if (req.session.loggedIn) {
        res.redirect('/homepage');
        return;
        }
     res.render('login', {logged_in: req.session.loggedIn});
   }catch (err) {
        res.status(500).json(err);
   } 
});

router.get('/profile', withAuth, async (req,res) => {
    try {
        res.render('profile', {logged_in: req.session.loggedIn});
    } catch(err) {
        res.status(500).json(err);
    }
})

router.get('/homepage', withAuth, async (req,res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
          });
      
          const posts = postData.map((post) => post.get({ plain: true }));
        let randomIndex = Math.floor(Math.random() * quoteList.length);
        let randomQuote = quoteList[randomIndex]


        res.render('homepage', {
            randomQuote,
            posts,
            logged_in: req.session.loggedIn
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;
