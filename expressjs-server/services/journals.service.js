var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('journals');

var service = {};

service.createJournal = createJournal;
service.deleteJournal = deleteJournal;
service.getAllJournals = getAllJournals;

module.exports = service;
//--------------------------------------------------------------------------------------------------------------------------------
function createJournal (userID, title) {
    var deferred = Q.defer();
    var createdJournal;

    db.journals.insert({ userID: userID, title: title}, function(error, doc) {
      if (error) deferred.reject(error.name + ': ' + error.message);

      deferred.resolve({id: doc.ops[0]._id});
    });

    return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
function deleteJournal (journalID) {
    var deferred = Q.defer();

    try {
        db.journals.deleteOne({
            _id: journalID
        });
    } catch (e) {
        deferred.reject("Error: " + e.errmsg);
    }
    deferred.resolve();

    return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
//Get all journals that are tied to a certain userID
function getAllJournals (userID) {
  var deferred = Q.defer();

  db.users.find({userID: userID}).toArray(function (err, journals) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    deferred.resolve(journals);
  });

  return deferred.promise;

}
//--------------------------------------------------------------------------------------------------------------------------------
