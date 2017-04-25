var config =      require('../config.json');
var Q =           require('q');
var mongo =       require('mongoskin');
var db =          mongo.db(config.connectionString, { native_parser: true });
var ObjectId =    require('mongodb').ObjectID;
db.bind('journals');

var service = {};
service.createPage        = createPage;
service.deletePage        = deletePage;
service.updatePage        = updatePage;
service.getPage           = getPage;
module.exports = service;
//--------------------------------------------------------------------------------------------------------------------------------
// Create a page within a journal
// Returns a success message on success, error message on error

function createPage(journalID, title) {
  var deferred = Q.defer();
  var date = new Date();

  db.journals.findOneAndUpdate(
    { _id: ObjectId(journalID) },
    {
      $addToSet:  { pages: { _id: ObjectId(), created: date, modified: date, title: title, bullets: [] } },
      $set:       { modified: date }
    },
    { returnNewDocument: true },
    function (err, newPage) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve({message: 'Page successfully added.'});
    }
  );
  return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
// Deletes a page from a journal
// Returns success message on success, error message on failure

function deletePage(journalID, pageID) {
  var deferred = Q.defer();
  var date = new Date();

  db.journals.update(
    { _id: ObjectId(journalID) },
    {
      $pull:  { pages : { "_id": ObjectId(pageID) } },
      $set:   { modified: date }
    },
    function (err, doc) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve({message: 'Page successfully deleted.'});
    }
  );
  return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
// Update a page title.
// Returns success message on success, error message on failure

function updatePage(journalID, pageID, title) {
  var deferred = Q.defer();
  var date = new Date();

  db.journals.update(
    { _id: ObjectId(_id), "pages._id": ObjectId(pageID)},
    { $set:
      {"pages.$.title": title, "pages.$.modified": date, modified: date}
    },
    function (err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve({message: 'Page successfully updated.'});
    }
  );
  return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
// Get a page.
// Returns a page object on success, error message on failure

function getPage(journalID, pageID) {
  var deferred = Q.defer();

  db.journals.findOne(
    { _id: ObjectId(journalID), "pages._id": ObjectId(pageID) },
    { 'pages.$': 1, _id: 0 },
    function (err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      if (doc && doc.pages && doc.pages.length > 0) {
        deferred.resolve(doc.pages[0]);
      }
  });

  return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
