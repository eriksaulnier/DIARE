var config =      require('../config.json');
var Q =           require('q');
var mongo =       require('mongoskin');
var db =          mongo.db(config.connectionString, { native_parser: true });
var ObjectId =    require('mongodb').ObjectID;
db.bind('journals');

var service = {};
service.createJournal     = createJournal;
service.deleteJournal     = deleteJournal;
service.deleteAllJournals = deleteAllJournals;
service.updateJournal     = updateJournal;
service.getJournal        = getJournal;
service.getLastModified   = getLastModified;
service.getAllJournals    = getAllJournals;
module.exports = service;
//--------------------------------------------------------------------------------------------------------------------------------
// Creates a new journal in the journals collection. Journal contains user's id, journal id, journal title.
// Returns journal's id and a success message on success, or an error message on failure

function createJournal (userID, title) {
  var deferred = Q.defer();
  var created = new Date();

  db.journals.insert(
    { userID: userID, title: title, created: created, modified: created, pages: []},
    function(error, doc) {
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

	db.journals.remove(
    {_id: ObjectId(journalID)},
    function(error, doc) {
      if (error) deferred.reject(error.name + ': ' + error.message);
      deferred.resolve({message: 'Journal successfully removed from database.'});
    }
  );
  return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
// Delete all journals with a given userID from the journals collection
// Returns a success message on success, error message on failure

function deleteAllJournals (userID) {
  var deferred = Q.defer();

	db.journals.remove(
    { userID: userID },
    function(error, doc) {
      if (error) deferred.reject(error.name + ': ' + error.message);
      deferred.resolve({message: 'All journals successfully removed from database.'});
    }
  );
  return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
// Get a journal with a certain journalID
// Returns journal object on success, error message on failure

function getJournal (journalID) {
  var deferred = Q.defer();

  db.journals.findOne(
    { _id: ObjectId(journalID) },
    {"pages.bullets": 0},
    function (err, journal) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    //sort pages from most recently modified to least recently modified
    if (journal && journal.pages && journal.pages.length > 0) {
      journal.pages.sort(function(a,b){
        return new Date(b.modified) - new Date(a.modified);
      });
    }

    deferred.resolve(journal);
  });

  return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
// Get the last modified journal for a given userID
// Returns a journal object on success, failure message on error
function getLastModified(userID) {
  var deferred = Q.defer();

  db.journals.find(
    {userID: userID}
  ).sort({modified: -1}).toArray(function (err, journals) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      if (journals && journals.length > 0) {
        var curJournal = journals[0];

        //sort pages from most recently modified to least recently modified
        if (curJournal && curJournal.pages && curJournal.pages.length > 0) {
          curJournal.pages.sort(function(a,b){
            return new Date(b.modified) - new Date(a.modified);
          });
        }

        deferred.resolve(journals[0]);
      }
      else {
        deferred.resolve(journals);
      }
    }
  );
  return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
// Gets all journals that are tied to a certain userID.
// Returns an array of journal objects on success, and an error message on failure

function getAllJournals (userID) {
  var deferred = Q.defer();

  db.journals.find(
    {userID: userID},
    {userID: 1, title: 1, modified: 1}
  ).sort({modified: -1}).toArray(function (err, journals) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve(journals);
    }
  );
  return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
// Updates a journal title.
// Returns success message on success, error message on failure

function updateJournal(journalID, data) {
  var deferred = Q.defer();
  date = new Date();

  db.journals.update(
    { _id: ObjectId(journalID)},
    { $set: {title: data.title, modified: date} },
    function (err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve({message: 'Journal successfully updated.'});
    }
  );
  return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
