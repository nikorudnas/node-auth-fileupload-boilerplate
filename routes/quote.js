var express = require('express');
var Quotes = require('../assets/quotes.json');

module.exports = (function () {

    var router = express.Router();

    router.get('/quote', function (req, res) {
        var quote = getRandomQuote();
        return res.status(200).json({
            success: true,
            quote: quote
        });
    });

    return router;
})();

function getRandomQuote() {
    return Quotes[(Quotes.length * Math.random()) << 0];
}