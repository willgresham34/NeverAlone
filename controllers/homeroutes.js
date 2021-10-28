const router = require('express').Router();
const { User, Post, Comments } = require('../models/');
const withAuth = require('../utils/auth');
const quoteList = require('../db/quotes.json');

router.get('/', async (req,res) => {
    try {
        if(req.session.loggedIn) {
            res.redirect('/homepage');
            return;
        }

        res.render('login');
    } catch(err) {
        res.status(500).json(err);
    }
});


router.get('/sign-up', async (req,res) => {
    try {
        if(req.session.loggedIn){
            res.redirect('/homepage');
        }
        res.render('signup');
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
     res.render('login');
   }catch (err) {
        res.status(500).json(err);
   } 
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
        let randomIndex = Math.floor(Math.random() * quoteList.length);
        let randomQuote = quoteList[randomIndex]


        res.render('homepage', {
            randomQuote
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;
