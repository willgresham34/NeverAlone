const router = require('express').Router();
const { User, Post, Comments } = require('../models/');
const withAuth = require('../utils/auth');

// quotes.json contains and array of quotes - used to display a quote at random
const quoteList = require('../db/quotes.json');


//_____________-- ROUTES --_____________________

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
        res.render('signup', {loggedIn: req.session.loggedIn});
    }catch (err) {
        res.status(500).json(err);
    }
});

// get login page -> if logged in, go to home page
router.get('/login', async (req,res) => {
   try {
     if (req.session.loggedIn) {
        res.redirect('/homepage');
        return;
        }
     res.render('login', {loggedIn: req.session.loggedIn});
   }catch (err) {
        res.status(500).json(err);
   } 
});


// get profile page when logged in
router.get('/profile', withAuth, async (req,res) => {
    try {
        res.render('profile', {loggedIn: req.session.loggedIn});
    } catch(err) {
        res.status(500).json(err);
    }
})


// get home page when logged in

router.get('/homepage', withAuth, async (req,res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User },
                      { model: Comments }
            ],
          });
      
          const posts = postData.map((post) => post.get({ plain: true }));
        let randomIndex = Math.floor(Math.random() * quoteList.length);
        let randomQuote = quoteList[randomIndex]


        res.render('homepage', {
            randomQuote,
            posts,
            comments,
            loggedIn: req.session.loggedIn
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;
