var express = require('express');
var multer = require('multer');
var fs = require('fs');
var path = require('path');

var constants = require('../constants');

/*
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (!fs.existsSync('./uploads)) {
            fs.mkdirSync('./uploads);
        }
        let path = './uploads;
        callback(null, path);
    },
    filename(req, file, cb) {
        let fileExt = file.originalname.substring(file.originalname.lastIndexOf('.')).toLowerCase();
        if (!imageFilter(fileExt)) {
            return false;
        } else {
            cb(null, 'pic_' + Date.now() + fileExt);
        }
    },
    onError: function (err, next) {
        console.log('error', err);
        next(err);
    },
});


const upload = multer({
    storage,
    limits: {
        fileSize: 1000 * 1000 * 2 // 2 MB
    }
}).single('file');

*/

module.exports = (function () {

    var router = express.Router();

    router.post('/upload', function (req, res) {
        res.json({ success: true });
    });

    return router;
})();

/*

const imageFilter = function (fileExt) {
    // accept image only
    let imageTypes = ['.jpg', 'jpeg', '.png', '.gif', 'webp'];
    if (imageTypes.indexOf(fileExt) == -1) {
        return false;
    }
    return true;
};

*/