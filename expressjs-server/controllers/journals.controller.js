var config = require('../config.json');
var express = require('express');
var router = express.Router();
var journalsService = require('../services/journals.service');

// routes
router.post('/create',            createJournal);
router.delete('/delete/:_id',     deleteJournal);
router.get('/getAll/:userID',     getAllJournals);
router.put('/:_id/:newTitle',     updateTitle);

module.exports = router;
//--------------------------------------------------------------------------------------------------------------------------------
// Add a new journal to the journals collection

function createJournal (req, res) {
    journalsService.createJournal(req.body.id, req.body.title)
        .then(function (result) {
            // send back the journal id and a success message
            res.send(result);
        })
        .catch(function (err) {
            // send back error message
            res.status(400).send(err);
        });
}
//--------------------------------------------------------------------------------------------------------------------------------
// Delete a journal with given journal ID from the journals collection

function deleteJournal (req, res) {
    journalsService.deleteJournal(req.params._id)
        .then(function (result) {
            // send back success message
            res.send(result);
        })
        .catch(function (err) {
            // send back error message
            res.status(400).send(err);
        });
}
//--------------------------------------------------------------------------------------------------------------------------------
// Get all journals with a given user id

function getAllJournals (req, res) {
  journalsService.getAllJournals(req.params.userID)
      .then(function (result) {
        // send back array of journal objects
        res.send(result);
      })
    .catch(function (err) {
      // send back error message
      res.status(400).send(err);
    });
}
//--------------------------------------------------------------------------------------------------------------------------------
// Update title of the journal

function updateTitle(req, res) {
  journalsService.updateTitle(req.params._id, req.body.newTitle)
        .then(function (result) {
            // send back success message
            res.send(result);
        })
        .catch(function (err) {
            // send back error message
            res.status(400).send(err);
        });
}
//--------------------------------------------------------------------------------------------------------------------------------
