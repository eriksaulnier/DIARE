var config = require('../config.json');
var express = require('express');
var router = express.Router();
var journalsService = require('../services/journals.service');

// routes
router.post('/create',                createJournal);
router.delete('/delete/:_id',         deleteJournal);
router.delete('/deleteAll/:userid',   deleteAllJournals);
router.get('/:_id',                   getJournal);
router.get('/getAll/:userID',         getAllJournals);
router.put('/:_id',                   updateJournal);

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
// Delete all journals with given user ID from the journals collection

function deleteAllJournals (req, res) {
    journalsService.deleteAllJournals(req.params.userid)
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
// Get a journal with a given journal id

function getJournal (req, res) {
  journalsService.getJournal(req.params._id)
    .then(function (result) {
      //send back journal objects
      res.send(result);
    })
    .catch(function (err) {
      //send back error message
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
// Update a journal

function updateJournal(req, res) {
  journalsService.updateJournal(req.params._id, req.body)
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
