var config =      require('../config.json');
var Q =           require('q');
var mongo =       require('mongoskin');
var db =          mongo.db(config.connectionString, { native_parser: true });
var ObjectId =    require('mongodb').ObjectID;
db.bind('journals');

var service = {};
service.createJournal     = createJournal;
service.deleteJournal     = deleteJournal;
service.getAllJournals    = getAllJournals;
service.updateJournal     = updateJournal;
service.addPage           = addPage;
service.deletePage        = deletePage;
module.exports = service;
//--------------------------------------------------------------------------------------------------------------------------------
// Creates a new journal in the journals collection. Journal contains user's id, journal id, journal title.
// Returns journal's id and a success message on success, or an error message on failure

function createJournal (userID, title) {
    var deferred = Q.defer();
    var created = new Date();

    db.journals.insert({ userID: userID, title: title, created: created, modified: created, pages: []}, function(error, doc) {
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
// Updates a journal
// Returns success message on success, error message on failure

function updateJournal(_id, data) {
  var deferred = Q.defer();
  data.modified = new Date();

  db.journals.update( { _id: ObjectId(_id)}, { $set: data }, function (err, doc) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    deferred.resolve({message: 'Journal successfully updated.'});
  });

  return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
// Adds a page to a journal.
// Returns an array of page objects on success, and an error message on failure.

function addPage(title, id){
    var deferred = Q.defer();
    var date = new Date();

    db.journals.findAndModify(
      { _id: id },
      [[ '_id', 'asc' ]],
      { $addToSet: { pages: { created: date, modified: date, title: title, bullets: [] }}},
      { new: true },
      function (err, doc) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve({ message: 'Page succesfully added.', pages: doc.pages });
      })

    return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
// Deletes a page from a journal.
// Returns _________ on success, and an error message on failure.

function deletePage(title, id){
    var deferred = Q.defer();

    db.journals.find(
      { _id: id },
      function (err, doc) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        var pages = doc.pages;
        for (var i = 0; i < pages.length; i++) {
          if (pages[i].title !== title) continue;

          pages.splice(i, 1);
          db.journals.update(
            { _id: id },
            { $set: { pages: pages }},
            function (err, num, status) {
              if (err) deferred.reject(err.name + ': ' + err.message);

              deferred.resolve({ message: 'The page was deleted succesfully. '});
            });
          
          break;
        }
      })

    return deferred.promise;
}