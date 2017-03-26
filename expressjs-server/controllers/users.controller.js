var config = require('../config.json');
var express = require('express');
var router = express.Router();
var usersService = require('../services/users.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
/* whats this?
router.get('/', getAll);
router.get('/current', getCurrent);
router.put('/:_id', update);
router.delete('/:_id', _delete);
*/

module.exports = router;

function authenticate(req, res) {
  usersService.authenticate(req.body.username, req.body.password)
    .then(function (user) {
      if (user) {
        // Authentication was successful
        res.send(user);
      } else {
        // Authentication failed because of incorrect user data
        res.status(401).send('Username or password is incorrect');
      }
    })
    .catch(function (err) {
      // Authentication failed because of non-user error
      res.status(400).send(err);
    });
}

function register(req, res) {
  usersService.create(req.body)
    .then(function () {
      // Registration was successful
      res.sendStatus(200);
    })
    .catch(function (err) {
      // Registration failed
      res.status(400).send(err);
    });
}
