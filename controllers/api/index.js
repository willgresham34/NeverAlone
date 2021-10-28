const router = require('express').Router();

const userRoutes = require('./userroutes');
//add other routes

router.use('/user', userRoutes);

module.exports = router;