const router = require('express').Router();
const userRoutes = require('./userroutes');
const postRoutes = require('./postroutes');
const commentsRoutes = require('./commentsroutes');


router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comments', commentsRoutes);


module.exports = router;