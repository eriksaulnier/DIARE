var config =      require('../config.json');
var Q =           require('q');
var mongo =       require('mongoskin');
var db =          mongo.db(config.connectionString, { native_parser: true });
var ObjectId =    require('mongodb').ObjectID;
db.bind('journals');

var service = {};
service.addBullet        = addBullet;
service.deleteBullet     = deleteBullet;
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
        {
          $push: {
            "pages.$.bullets": {
              _id: ObjectId(),
              created:    date,
              modified:   date,
              content:    data.content,
              type:       data.type,
              starred:    data.starred
            }
          },
          $set: {
            "pages.$.modified": date,
            "modified": date
          }
        },
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
        {
          $pull: {
            "pages.$.bullets": { _id: ObjectId(bulletID) }
          },
          $set: {
            "pages.$.modified": date,
            "modified": date
          }
        },
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            deferred.resolve({ message: 'Bullet successfully updated.' });
        }
    );

    return deferred.promise;
}
//--------------------------------------------------------------------------------------------------------------------------------
// Updates properties of a bullet
// Returns a success message on success, or an error message on failure.

function updateBullet (journalID, pageID, bulletID, data) {
  var deferred = Q.defer();

  db.journals.findOne(
      { _id: ObjectId(journalID), "pages._id": ObjectId(pageID) },
      { 'pages.$': 1, _id: 0},
      function (err, doc) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (doc && doc.pages && doc.pages[0]) {
          var bullets = doc.pages[0].bullets;
          for (var i = 0; i < bullets.length; ++i) {
            if (bullets[i]._id != bulletID) {
              continue;
            }
            var bullet = bullets[i];
            var bullet_pos = "pages.$.bullets." + i.toString();

            var obj={};

            for (item in data) {
              bullet[item] = data[item];
            }

            obj[bullet_pos] = bullet;

            db.journals.updateOne(
              {_id: ObjectId(journalID), "pages._id": ObjectId(pageID) },
              {$set: obj },
              function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                deferred.resolve({message: 'Bullet successfully updated.'});
              }
            )
            break;
          }
        }
        else {
          deferred.reject({ message: "Failed to update bullet." });
        }
      }
  );
  return deferred.promise;
}

//--------------------------------------------------------------------------------------------------------------------------------
// Search bullets with containing a query.
// Returns an array of bullet objects on success, and an error message on failure.

function searchBullets (userID, data) {
    var deferred = Q.defer();
    var bullets = [];

    db.journals.find(
      { userID: userID },
      { _id: 1, "pages": 1}
    ).toArray( function (err, doc) {
        if (err) {
          deferred.reject(err.name + ': ' + err.message);
        }

        doc.forEach(function(item) {
          var journal_id = item._id;
          var pages_array = item.pages;

          //for each pages array
          pages_array.forEach(function(page) {
            var bullets_array = page.bullets;
            var page_id = page._id;

            //for each bullets array
            bullets_array.forEach(function(bullet) {

              //for each key in the input data
              for (key in data) {
                if ((key !== "content") && (bullet[key].toString() === data[key])) {
                    bullet.journalID = journal_id;
                    bullet.pageID = page_id;
                    bullets.push(bullet);
                }
                else if ((key === "content") && bullet[key].includes(data[key])) {
                  bullet.journalID = journal_id;
                  bullet.pageID = page_id;
                  bullets.push(bullet);
                }
              }
            });
          });
        });

        deferred.resolve(bullets);
      }
    );

    return deferred.promise;
}
