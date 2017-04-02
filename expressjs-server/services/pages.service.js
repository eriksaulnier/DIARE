var config =      require('../config.json');
var Q =           require('q');
var mongo =       require('mongoskin');
var db =          mongo.db(config.connectionString, { native_parser: true });
var ObjectId =    require('mongodb').ObjectID;
db.bind('pages');

var service = {};
/*
service.createPage        = createPage;
service.deletePage        = deletePage;
service.getAllPages       = getAllPages;
*/
service.updatePage       = updatePage;
module.exports = service;

//--------------------------------------------------------------------------------------------------------------------------------
// Update a page
// Returns success message on success, error message on failure

function updatePage(_id, data) {
  var deferred = Q.defer();
  data.modified = new Date();

  db.pages.update( { _id: ObjectId(_id)}, { $set: data }, function (err, doc) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    deferred.resolve({message: 'Page successfully updated.'});
  });

  return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
