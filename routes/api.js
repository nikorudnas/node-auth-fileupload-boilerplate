var express = require('express');

var register = require('./register');
var login = require('./login');
var quote = require('./quote');
var tokenMiddleware = require('./middleware/token');
var authquote = require('./authquote');
var upload = require('./upload');

// combine all routes and export them to server.js
// access them from http://localhost:port/api/
var router = express.Router();
router.use(
    register,
    login,
    quote,
    // everything after this requires a valid jwt token
    tokenMiddleware,
    authquote,
    upload
);

module.exports = router;
