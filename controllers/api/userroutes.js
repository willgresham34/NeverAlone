const router = require("express").Router();
const { User } = require("../../models");

router.post('/', async (req,res) => {
    try {
        const newUser = await User.create({
            first_name: req.body.first_name,
            last_name : req.body.last_name,
            email: req.body.email,
            password: req.body.password
        });
        console.log(newUser);

        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.email = newUser.email;
            req.session.loggedIn = true;

            res.json(newUser);
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req,res) => {
    try {
        console.log(req.body);
        const user = await User.findOne({
            where: { email: req.body.email}
        });

        if(!user) {
            res.status(400).json({ message: 'No account found with this email'});
            return;
        }

        const passwordValid = user.checkPassword(req.body.password);

        if(!passwordValid) {
            res.status(400).json({ message: 'No account found with this password'});
        }

        req.session.save(() => {
            req.session.userId = user.id;
            req.session.email = user.email;
            req.session.loggedIn = true;

            res.json({ message: 'You are now logged in!'});
        });

    } catch(err) {
        res.status(500).json(err);
    }
});

router.put('/update', async (req,res) => {
    try {
        console.log(req.body);
        const profileUpdate = await User.update(req.body,
            {where: { id: req.session.userId }},
        );
        
        res.json(profileUpdate);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/logout', async (req,res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})

module.exports = router;
