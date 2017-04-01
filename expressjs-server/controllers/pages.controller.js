var config =            require('../config.json');
var express =           require('express');
var router =            express.Router();
var pagesService =    require('../services/pages.service');

// routes
router.post('/create',            createPage);
router.delete('/delete/:_id',     deletePage);
router.get('/getAll/:userID',     getAllPages);

module.exports = router;
//--------------------------------------------------------------------------------------------------------------------------------
//Copy almost exactly what the journals controller does
