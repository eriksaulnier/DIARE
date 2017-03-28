var config =      require('../config.json');
var Q =           require('q');
var mongo =       require('mongoskin');
var db =          mongo.db(config.connectionString, { native_parser: true });
var ObjectId =    require('mongodb').ObjectID;
db.bind('journals');

var service = {};
service.createJournal = createJournal;
service.deleteJournal = deleteJournal;
service.getAllJournals = getAllJournals;
module.exports = service;
//--------------------------------------------------------------------------------------------------------------------------------
// Creates a new journal in the journals collection. Journal contains user's id, journal id, journal title.
// Returns journal's id and a success message on success, or an error message on failure

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
// Deletes a journal from the journals collection.
// Returns a success message on success, and an error message on failure

function deleteJournal (journalID) {
    var deferred = Q.defer();

		db.journals.remove({_id: ObjectId(journalID)}, function(error, doc) {
			if (error) deferred.reject(error.name + ': ' + error.message);

			deferred.resolve({message: 'Journal successfully removed from database.'});
		});

    return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
// Gets all journals that are tied to a certain userID.
// Returns an array of journal objects on success, and an error message on failure

function getAllJournals (userID) {
  var deferred = Q.defer();

  db.journals.find({userID: userID}).toArray(function (err, journals) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    deferred.resolve(journals);
  });

  return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
