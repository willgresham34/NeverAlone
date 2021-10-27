const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("test api")
  });
  

module.exports = router;