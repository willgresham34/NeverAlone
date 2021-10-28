const router = require('express').Router();

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
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/homepage', async (req,res) => {
    try {
        res.render('homepage');
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;
