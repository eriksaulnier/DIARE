var config = require('../config.json');
var express = require('express');
var router = express.Router();
var usersService = require('../services/users.service');
var journalsService = require('../services/journals.service');

// routes
router.post('/create',  createJournal);
router.post('/delete',  deleteJournal);
router.get('/getAll',   getAllJournals);

module.exports = router;

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

function deleteJournal (req, res) {
    journalsService.deleteJournal(req.body.userID, req.body.journalID)
        .then(function () {
            // Deletion was succsessful
            res.sendStatus(200);
        })
        .catch(function (err) {
            // Deletion failed
            res.status(400).send(err);
        });
}

function getAllJournals (req, res) {
  journalsService.getAllJournals(req.body.userID)
    .then(function (result) {
      // send back array of journal objects that are tied to userID
      res.send(result);
    })
    .catch(function (err) {
      // getting all journals failed
      res.status(400).send(err);
    });
}