const router = require('express').Router();
const userRoutes = require('./userroutes');
const postRoutes = require('./postroutes');

router.use('/user', userRoutes);
router.use('/post', postRoutes);


module.exports = router;