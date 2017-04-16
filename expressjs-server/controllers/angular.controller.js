var path = require('path');
var config = require('../config.json');
var express = require('express');
var router = express.Router();

// routes
router.get('/', sendIndex)
router.get('/home', sendIndex);
router.get('/register', sendIndex);
router.get('/journals', sendIndex);
router.get('/settings', sendIndex);

module.exports = router;

//If a user hits any of the routes listed above, send them back the index file and let Angular handle the routes
function sendIndex(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../../angular2-client/dist/index.html'));
}
