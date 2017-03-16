require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');

var port = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use JWT authentication to secure the API
app.use(expressJwt({ secret: config.secret }).unless({ path:
  [
    '/users/authenticate',
    '/users/register',
    '/',
    '/home',
    '/register',
    '/favicon.ico',
    /\/vendor.*/,
    /\/styles.*/,
    /\/inline.*/,
    /\/main.*/
  ] }));

// routes
app.use('/users', require('./controllers/users.controller'));

//Serve index.html file
app.get('/', function (req, res, next) {
  res.sendFile(__dirname + '/dist/index.html');
});

//Serve static files from dist directory
app.use(express.static('dist'));

// start server
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
