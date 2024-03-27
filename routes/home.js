const express = require("express");
const router = express.Router();
const fs = require('fs');

express.set('view engine', 'ejs');

router.get("/", (req, res) => {
  fs.readFile(__dirname + '/public/index.html', 'utf8', (err, text) => {
      res.send(text);
  });
})

module.exports = router;
