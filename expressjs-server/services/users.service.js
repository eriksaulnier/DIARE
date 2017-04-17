var config =    require('../config.json');
var _ =         require('lodash');
var jwt =       require('jsonwebtoken');
var bcrypt =    require('bcryptjs');
var Q =         require('q');
var mongo =     require('mongoskin');
var db =        mongo.db(config.connectionString, { native_parser: true });
var ObjectId =  require('mongodb').ObjectID;
db.bind('users');

var service = {};
service.authenticate    = authenticate;
service.create          = create;
//service.update          = update;
service.deleteUser      = deleteUser;
module.exports = service;
//--------------------------------------------------------------------------------------------------------------------------------
// Checks whether or not login information that user provided is correct.
// Returns user object on success, error message on failure

function authenticate(email, password) {
  var deferred = Q.defer();

  db.users.findOne({ email: email }, function (err, user) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    // Compares plain text password that user entered with hashed password from DB
    if (user && bcrypt.compareSync(password, user.hash)) {
      // Authentication was successful, return user object
      deferred.resolve({
        _id: user._id,
        email: user.email,
        admin: user.admin,
        token: jwt.sign({ sub: user._id }, config.secret)
      });
    } else {
      // Authentication failed, return error
      deferred.resolve();
    }
  });
  return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
// Creates a new user in the users collection. User contains id, email, hashed password, whether the user is an admin or not
// Returns success status on success, error message on failure

function create(userParam) {
  var deferred = Q.defer();

  // Check to make that account with provided email address is not already in use
  db.users.findOne({ email: userParam.email }, function (err, user) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      if (user) {
        // Email is already in use, return error message
        deferred.reject('Email "' + userParam.email + '" is already in use');
      } else {
        // Email is not already in use, create new user
        createUser();
      }
    });

    function createUser() {
      // Set user object to userParam without the cleartext password
      var user = _.omit(userParam, 'password');

      // Add hashed password to user object
      user.hash = bcrypt.hashSync(userParam.password, 10);

      // Insert user object into users collection in DB
      db.users.insert(user, function (err, doc) {
          if (err) deferred.reject(err.name + ': ' + err.message);

          deferred.resolve();
        });
    }
    return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
// Deletes user account from database
// Returns success message on success, error message on failure

function deleteUser(_id) {
  var deferred = Q.defer();

  db.users.remove(
      { _id: ObjectID(_id) },
      function (err) {
          if (err) deferred.reject(err.name + ': ' + err.message);

          deferred.resolve({message: 'User account successfully removed.'});
      });

  return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
