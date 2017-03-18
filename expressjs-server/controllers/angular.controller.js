var path = require('path');
var config = require('config.json');
var express = require('express');
var router = express.Router();

// routes
router.get('/', sendIndex)
router.get('/home', sendIndex);
router.get('/register', sendIndex);

module.exports = router;

function sendIndex(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
}
