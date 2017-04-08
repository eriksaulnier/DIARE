var config =            require('../config.json');
var express =           require('express');
var router =            express.Router();
var pagesService =      require('../services/pages.service');

// routes
router.post('/create',                              createPage);
router.delete('/delete/:journal_id/:page_id',       deletePage);
router.put('/:journal_id/:page_id',                 updatePage);
//router.get('/getAll/:journalID',     getAllPages);
module.exports = router;

//--------------------------------------------------------------------------------------------------------------------------------
// Add a new page to a journal

function createPage (req, res) {
    pagesService.createPage(req.body.id, req.body.title)
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
// Delete a page with a given page ID from a journal document with a given journal ID

function deletePage (req, res) {
  pagesService.deletePage(req.params.journal_id, req.params.page_id)
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
// Update a page

function updatePage(req, res) {
  pagesService.updatePage(req.params.journal_id, req.params.page_id, req.body.title)
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
