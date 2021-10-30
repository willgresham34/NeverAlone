const router = require('express').Router();
const { Comments } = require('../../models/');
const {withAuth} = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComments = await Comments.create(req.body);
    res.json(newComments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
