var config =        require('../config.json');
var express =       require('express');
var router =        express.Router();
var usersService =  require('../services/users.service');

// routes
router.post('/authenticate',          authenticate);
router.post('/register',              register);
router.put('/:_id',                   update);
router.delete('/delete/:_id',         deleteUser);

module.exports = router;
//--------------------------------------------------------------------------------------------------------------------------------
// Checks whether or not the user's login information is correct

function authenticate(req, res) {
  usersService.authenticate(req.body.username, req.body.password)
    .then(function (user) {
      if (user) {
        // Authentication was successful, send back user object
        res.send(user);
      } else {
        // Authentication failed because of incorrect user data, send error message
        res.status(401).send('Username or password is incorrect');
      }
    })
    .catch(function (err) {
      // Authentication failed because of non-user error, send error message
      res.status(400).send(err);
    });
}
//--------------------------------------------------------------------------------------------------------------------------------
// Adds new user to users collection

function register(req, res) {
  usersService.create(req.body)
    .then(function (result) {
      // Send back new user object
      res.send(result);
    })
    .catch(function (err) {
      // Send back error message
      res.status(400).send(err);
    });
}
//--------------------------------------------------------------------------------------------------------------------------------
// Updates user email address or password

function update(req, res) {
  usersService.update(req.params._id, req.body)
    .then(function (result) {
      if (result) {
        //update succeeded, send back success message
        res.send(result);
      }
      else {
        //update failed because user entered wrong password, send back error message
        res.status(401).send('Current password is incorrect.');
      }
    })
    .catch(function (err) {
      //send back error message
      res.status(400).send(err);
    });
}
//--------------------------------------------------------------------------------------------------------------------------------
// Deletes user's account

function deleteUser(req, res) {
  usersService.deleteUser(req.params._id)
    .then(function (result) {
      res.send(result);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}
//--------------------------------------------------------------------------------------------------------------------------------
