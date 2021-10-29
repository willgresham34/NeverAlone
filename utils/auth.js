const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    next();
  }
};

<<<<<<< HEAD
module.exports = { withAuth };
=======
module.exports = {withAuth};
>>>>>>> 67260772553094a6eb28e2a71db17ab4957cff54
