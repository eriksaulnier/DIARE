require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('./config.json');

var port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//--------------------------------------------------------------------------------------------------------------------------------
// Use JWT authentication to secure the API
// The paths in the following array do not require the user to have a token, or they're handled by the Angular 2 Client
app.use(expressJwt({ secret: config.secret }).unless({ path:
  [
    '/users/authenticate',
    '/users/register',
    '/',
    '/home',
    '/register',
    '/journals',
    '/settings',
    '/favicon.ico',
    /\/vendor.*/,
    /\/styles.*/,
    /\/inline.*/,
    /\/main.*/,
    /\/scripts.*/,
    /\/material.*/,
    /\/ripples.*/
  ] }));
//--------------------------------------------------------------------------------------------------------------------------------
// routes
app.use('/',          require('./controllers/angular.controller'));
app.use('/users',     require('./controllers/users.controller'));
app.use('/journals',  require('./controllers/journals.controller'));
app.use('/pages',     require('./controllers/pages.controller'));

//Serve static files from dist directory
app.use(express.static(__dirname + '/../angular2-client/dist'));

// start server
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
