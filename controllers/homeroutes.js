const router = require("express").Router();
const { User, Post, Comments } = require("../models/");
const { withAuth } = require("../utils/auth");

// quotes.json contains and array of quotes - used to display a quote at random
const quoteList = require("../db/quotes.json");

//_____________-- ROUTES --_____________________

// gets login page on initial load, if logged in takes user to homepage
router.get("/", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect("/homepage");
    }
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
  res.render("login");
});

// get sign up page -> if logged in, go to home page
<<<<<<< HEAD
router.get('/sign-up', async (req,res) => {
    try {
        if(req.session.loggedIn){
            res.redirect('/homepage');
        }
        res.render('signup', {loggedIn: req.session.loggedIn});
    }catch (err) {
        res.status(500).json(err);
=======
router.get("/sign-up", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect("/homepage");
>>>>>>> 5be149a8e4029ec7c5122b2e388f8b754db0af35
    }
    res.render("signup", { logged_in: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get login page -> if logged in, go to home page
<<<<<<< HEAD
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
=======
router.get("/login", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect("/homepage");
      return;
    }
    res.render("login", { logged_in: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
>>>>>>> 5be149a8e4029ec7c5122b2e388f8b754db0af35
});

// get profile page when logged in
<<<<<<< HEAD
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
            include: [{ model: User }]
          });
      
        const posts = postData.map((post) => post.get({ plain: true }));
        let randomIndex = Math.floor(Math.random() * quoteList.length);
        let randomQuote = quoteList[randomIndex]
        console.log("Posts", posts);

        res.render('homepage', {
            posts,
            randomQuote,
            loggedIn: req.session.loggedIn
        });
    } catch(err) {
        res.status(500).json(err);
    }
=======
router.get("/profile", withAuth, async (req, res) => {
  try {
    res.render("profile", { logged_in: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get home page when logged in

router.get("/homepage", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    // let randomIndex = Math.floor(Math.random() * quoteList.length);
    // let randomQuote = quoteList[randomIndex]
    console.log("Posts", posts);

    res.render("homepage", {
      posts,
      // randomQuote,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
>>>>>>> 5be149a8e4029ec7c5122b2e388f8b754db0af35
});

module.exports = router;
