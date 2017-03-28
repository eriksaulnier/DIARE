var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var ObjectId = require('mongodb').ObjectID;
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

      deferred.resolve({id: doc.ops[0]._id, message: 'Journal successfully added to database.'});
    });

    return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
function deleteJournal (journalID) {
    var deferred = Q.defer();

		db.journals.remove({_id: ObjectId(journalID)}, function(error, doc) {
			if (error) deferred.reject(error.name + ': ' + error.message);

			deferred.resolve({message: 'Journal successfully removed from database.'});
		});

    return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
//Get all journals that are tied to a certain userID
function getAllJournals (userID) {
  var deferred = Q.defer();

  db.journals.find({userID: userID}).toArray(function (err, journals) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    deferred.resolve(journals);
  });

  return deferred.promise;

}
//--------------------------------------------------------------------------------------------------------------------------------
