var express = require('express');
var AuthQuotes = require('../assets/authquotes.json');

module.exports = (function () {

    var router = express.Router();

    router.get('/authquote', function (req, res) {
        var authquote = getRandomQuote();
        return res.status(200).json({
            success: true,
            authquote: authquote
        });
    });

    return router;
})();

function getRandomQuote() {
    return AuthQuotes[(AuthQuotes.length * Math.random()) << 0];
}