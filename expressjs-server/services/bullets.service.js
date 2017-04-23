var config =      require('../config.json');
var Q =           require('q');
var mongo =       require('mongoskin');
var db =          mongo.db(config.connectionString, { native_parser: true });
var ObjectId =    require('mongodb').ObjectID;
db.bind('journals');

var service = {};
service.addBullet        = addBullet;
service.deleteBullet     = deleteBullet;
service.getAllBullets    = getAllBullets;
service.updateBullet     = updateBullet;
service.searchBullets    = searchBullets;
module.exports = service;
//--------------------------------------------------------------------------------------------------------------------------------
// Adds a bullet to the specified page.
// Returns a success message on success, or an error message on failure.

function addBullet (journalID, pageID, data) {
    var deferred = Q.defer();
    var date = new Date();

    db.journals.updateOne(
        { _id: ObjectId(journalID), "pages._id": ObjectId(pageID) },
        { $push: { "pages.$.bullets": {
            _id: ObjectID(),
            created: date,
            modified: date,
            content: data.content,
            starred: data.starred }
        }},
        { $set: { "pages.$.modified": date, "modified": date } },
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            deferred.resolve({message: 'Bullet successfully added.'});
        }
    );

    return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
// Deletes a bullet from a page.
// Returns a success message on success, or an error message on failure.

function deleteBullet (journalID, pageID, bulletID) {
    var deferred = Q.defer();
    var date = new Date();

    db.journals.updateOne(
        { _id: ObjectId(journalID), "pages._id": ObjectId(pageID) },
        { $pull: { "pages.$.bullets": { _id: ObjectID(bulletID) } } },
        { $set: { "pages.$.modified": date, "modified": date } },
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            deferred.resolve({ message: 'Bullet successfully updated.' });
        }
    );

    return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
// Gets all bullets that are tied to a certain userID.
// Returns an array of bullet objects on success, and an error message on failure.

function getAllBullets (userID) {
    var deferred = Q.defer();
    var bullets = [];

    db.journals.find(
        { userID: ObjectId(userID) },
        { _id: 0, pages: 1 }
    ).toArray(
        function (err, pages_array) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            pages_array.forEach(function (pages) {
                pages.forEach(function (page) {
                    bullets = bullets.concat(page.bullets);
                });
            });
            deferred.resolve(bullets);
        }
    );

    return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
// Updates properties of a bullet
// Returns a success message on success, or an error message on failure.

function updateBullet (journalID, pageID, bulletID, data) {
    var deferred = Q.defer();
    var cursor = db.journals.find(
        { _id: ObjectId(journalID), "pages._id": ObjectId(pageID) },
        { pages: 1 }
    );
    var result = cursor.hasNext() ? cursor.next : null;

    if (result) {
        for (var i = 0; i < result.pages.bullets; i++) {
            var bullet = results.pages.bullets[i];
            if (bullet._id !== ObjectID(bulletID)) continue;
            for (property in data) {
                bullet.property = data.property;
            }
            var bullet_position = `pages.$.bullets.${i}`;
            db.journals.updateOne(
                { _id: ObjectId(journalID), "pages._id": ObjectId(pageID) },
                { $set: { bullet_position: bullet } },
                function (err, doc) {
                    if (err) deferred.reject(err.name + ': ' + err.message);
                    deferred.resolve({message: 'Bullet successfully updated.'});
                }
            );
            break;
        }
    } else {
        deferred.reject({ message: "Failed to update bullet." });
    }

    return deferred.promise;
}

//--------------------------------------------------------------------------------------------------------------------------------
// Search bullets with containing a query.
// Returns an array of bullet objects on success, and an error message on failure.

function searchBullets (userID, query) {
    var deferred = Q.defer();
    var bullets = [];
    var query_property = query.property;

    db.journals.find(
        { userID: ObjectId(userID), query_parameter: query.term },
        { _id: 0, pages: 1 }
    ).toArray(
        function (err, pages_array) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            pages_array.forEach(function (pages) {
                pages.forEach(function (page) {
                    bullets = bullets.concat(page.bullets);
                });
            });
            deferred.resolve(bullets);
        }
    );

    return deferred.promise;
}
