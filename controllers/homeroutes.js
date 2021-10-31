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

// Gets user data to profile so data displays when user doesn't have any posts
router.get('/profile', withAuth, async (req, res) => {
  try{
    const userData = await User.findAll({
      where: {
        id: req.session.userId,
      },
    });
    const user = userData.map(data => data.get({ plain: true }));
    console.log('User Data (user): ',user);

    const postData = await Post.findAll({
      where: {
        user_id: req.session.userId,
      },
      include: [
        {
          model: User
        }
      ],
      order: [['created_at', 'DESC']],
    })

    const userPosts = postData.map(post => post.get({ plain: true }));

    console.log("Posts on Profile (userPosts): ", userPosts);

    res.render('profile', {user, userPosts, loggedIn:req.session.loggedIn});
  }
  catch(err){
    res.status(500).json(err);
  }
});

// Renders page to edit a post

router.get("/profile/edit/:id", withAuth, async (req, res) => {
  try{
    const selectedPost = await Post.findByPk(req.params.id, {
      include:[
        User,

       {
         model: Comments,
         include: [User],
       },
     ],
   });
   if(selectedPost){
     const editPost = selectedPost.get({ plain: true });
     console.log("Post to Edit (editPost): ", editPost);
     res.render("editPost", { editPost, loggedIn: true });
   }
   else{
     res.status(404).end();
   }
  }
  catch(err){
    res.status(500).json(err);
  }
});






// get home page when logged in

router.get("/homepage", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include:[ User,
      {
        model:Comments,
        include: User,
      },
    ],
    order: [['created_at', 'DESC']],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    let randomIndex = Math.floor(Math.random() * quoteList.length);
    let randomQuote = quoteList[randomIndex];
    
    console.log("Posts on Homepage: ", posts);

    res.render("homepage", {
      posts,
      // comments,
      randomQuote,
      loggedIn: req.session.loggedIn,
    });
  } 
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
