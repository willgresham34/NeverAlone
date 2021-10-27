const path = require('path');
const router = require('express').Router();

// "/notes" responds with the notes.html file
router.get('/', (req, res) => {
  res.send("test ho,e")
});


module.exports = router;
