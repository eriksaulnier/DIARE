var config =            require('../config.json');
var express =           require('express');
var router =            express.Router();
var pagesService =      require('../services/pages.service');

// routes
/*
router.post('/create',            createPage);
router.delete('/delete/:_id',     deletePage);
router.get('/getAll/:userID',     getAllPages);
*/
router.put('/:_id',               updatePage);
module.exports = router;

//--------------------------------------------------------------------------------------------------------------------------------
// Update a page

function updatePage(req, res) {
  pagesService.updatePage(req.params._id, req.body)
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
