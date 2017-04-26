var config =            require('../config.json');
var express =           require('express');
var router =            express.Router();
var bulletsService =    require('../services/bullets.service');

// routes
router.post('/add',                                         addBullet);
router.delete('/delete/:journalID/:pageID/:bulletID',       deleteBullet);
router.put('/:journalID/:pageID/:bulletID',                 updateBullet);
router.post('/search/:userID',                              searchBullets);
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
    bulletsService.deleteBullet(req.params.journalID, req.params.pageID, req.params.bulletID)
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
    bulletsService.updateBullet(req.params.journalID, req.params.pageID, req.params.bulletID, req.body)
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
  bulletsService.searchBullets(req.params.userID, req.body)
      .then(function (result) {
          res.send(result);
      })
      .catch(function (err) {
          res.status(400).send(err);
      });
}
