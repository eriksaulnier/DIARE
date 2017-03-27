var config = require('../config.json');
var express = require('express');
var router = express.Router();
var usersService = require('../services/users.service');
var journalsService = require('../services/journals.service');

// routes
router.post('/create',            createJournal);
router.delete('/delete/:_id',     deleteJournal);
router.get('/getAll/:userID',     getAllJournals);

module.exports = router;
//--------------------------------------------------------------------------------------------------------------------------------
function createJournal (req, res) {
    journalsService.createJournal(req.body.id, req.body.title, req.body.content)
        .then(function (result) {
            // send back the id for the journal
            res.send(result);
        })
        .catch(function (err) {
            // Journal creation failed
            res.status(400).send(err);
        });
}
//--------------------------------------------------------------------------------------------------------------------------------
// Delete journal with given journal ID
function deleteJournal (req, res) {
    journalsService.deleteJournal(req.params._id)
        .then(function () {
            // Deletion was succsessful
            res.sendStatus(200);
        })
        .catch(function (err) {
            // Deletion failed
            res.status(400).send(err);
        });
}
//--------------------------------------------------------------------------------------------------------------------------------
// Send all journals tied to certain user ID
function getAllJournals (req, res) {
  journalsService.getAllJournals(req.params.userID)
      // send back array of journal objects that are tied to userID
      res.send(result);
    })
    .catch(function (err) {
      // getting all journals failed
      res.status(400).send(err);
    });
}
