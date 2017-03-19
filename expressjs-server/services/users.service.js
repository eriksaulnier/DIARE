var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

var service = {};

service.authenticate = authenticate;
service.create = create;
/*
service.getAll = getAll;
service.getById = getById;
service.update = update;
service.delete = _delete;
*/

module.exports = service;

function authenticate(email, password) {
  var deferred = Q.defer();

  db.users.findOne({ email: email }, function (err, user) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    if (user && bcrypt.compareSync(password, user.hash)) {
      // Authentication was successful
      deferred.resolve({
        _id: user._id,
        email: user.email,
        admin: user.admin,
        token: jwt.sign({ sub: user._id }, config.secret)
      });
    } else {
      // Authentication failed
      deferred.resolve();
    }
  });
  return deferred.promise;
}

function create(userParam) {
  var deferred = Q.defer();

  // Check to make sure email is not already being used
  db.users.findOne(
    { email: userParam.email },
    function (err, user) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      if (user) {
        // Email is already in use
        deferred.reject('Email "' + userParam.email + '" is already in use');
      } else {
        createUser();
      }
    });

    function createUser() {
      // Set user object to userParam without the cleartext password
      var user = _.omit(userParam, 'password');

      // add hashed password to user object
      user.hash = bcrypt.hashSync(userParam.password, 10);

      db.users.insert(
        user,
        function (err, doc) {
          if (err) deferred.reject(err.name + ': ' + err.message);

          deferred.resolve();
        });
    }
    return deferred.promise;
}
