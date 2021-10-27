const router = require('express').Router();
const { User } = require('../../models');

router.post('/', (req,res) => {
    try {
        const newUser = await User.create({
            email: req.body.email,
            password: req.body.password
        });
    } catch(err) {
        res.status(500).json(err);
    }
});