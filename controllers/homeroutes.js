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
});

// get sign up page -> if logged in, go to home page
router.get("/sign-up", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect("/homepage");
    }
    res.render("signup", { logged_in: req.session.loggedIn });
    // console.log("Data:", req.body.email);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get login page -> if logged in, go to home page
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
});

// get profile page when logged in

router.get("/profile", withAuth, async (req, res) => {

  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.userId,
      },
<<<<<<< HEAD
    });
    console.log("bio", userData.bio);
    const dataUser = userData.get({ plain: true });
    res.render("profile", { loggedIn: req.session.loggedIn, dataUser });
  } catch (err) {
=======
      include: [
        {
          model: User
        }
      ]
    })

    const userPosts = postData.map(post => post.get({ plain: true }));

    console.log("Posts on Profile (userPosts): ", userPosts);

    res.render('profile', { userPosts, loggedIn: req.session.loggedIn });
  } 



  catch (err) {
>>>>>>> 6c55aaf4aaaf74da9f6f51ddc0c87e0b97529abf
    res.status(500).json(err);
  }
});

// get home page when logged in

router.get("/homepage", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
<<<<<<< HEAD
      include: [{ model: User }, { model: Comments }],
=======
      include:[ User,
      {
        model:Comments,
        include: User,
      },
    ],
>>>>>>> 6c55aaf4aaaf74da9f6f51ddc0c87e0b97529abf
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    let randomIndex = Math.floor(Math.random() * quoteList.length);
    let randomQuote = quoteList[randomIndex];
<<<<<<< HEAD

    console.log("Posts", posts);
=======
    
    console.log("Posts on Homepage: ", posts);
>>>>>>> 6c55aaf4aaaf74da9f6f51ddc0c87e0b97529abf

    res.render("homepage", {
      posts,
      // comments,
      randomQuote,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
