var config =            require('../config.json');
var express =           require('express');
var router =            express.Router();
var bulletsService =    require('../services/bullets.service');

// routes
router.post('/add',                                         addBullet);
router.delete('/delete/:journal_id/:page_id/:bullet_id',    deleteBullet);
router.get('/:_id',                                         getBullets);
router.put('/:journal_id/:page_id/:bullet_id',              updateBullet);
router.get('search/:_id',                                         searchBullets);
module.exports = router;

//--------------------------------------------------------------------------------------------------------------------------------
// Add a bullet to a page.

function addBullet (req, res) {
    bulletsService.addBullet(req.body.journalID, req.body.pageID, req.body.data)
        .then(function (result) {
            res.send(result);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
//--------------------------------------------------------------------------------------------------------------------------------
// Delete a bullet from a page

function deleteBullet (req, res) {
    bulletsService.deleteBullet(req.body.journalID, req.body.pageID, req.body.bulletID)
        .then(function (result) {
            res.send(result);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
//--------------------------------------------------------------------------------------------------------------------------------
// Retrieve all bullets tied to a user

function getBullets (req, res) {
    bulletsService.getAllBullets(req.body.userID)
        .then(function (result) {
            res.send(result);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
//--------------------------------------------------------------------------------------------------------------------------------
// Update a page's bullet

function updateBullet (req, res) {
    bulletsService.updateBullet(req.body.journalID, req.body.pageID, req.body.bulletID, req.body.data)
        .then(function (result) {
            res.send(result);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
//--------------------------------------------------------------------------------------------------------------------------------
// Search for all bullets under a specific query.

function searchBullets (req, res) {
    bulletsService.searchBullets(req.body.userID, req.body.query)
        .then(function (result) {
            res.send(result);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}