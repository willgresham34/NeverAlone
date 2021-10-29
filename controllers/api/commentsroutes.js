const router = require('express').Router();
const { Comments } = require('../../models/');
const withAuth = require('../../utils/auth');

router.post('/homepage', withAuth, async (req, res) => {
  try {
    const newComments = await Comments.create({
        postContent: req.body.description,
        user_id: req.session.user_id
    });
    res.json(newComments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
