var express = require('express');
var multer = require('multer');
var fs = require('fs');
var ip = require('ip');
var path = require('path');

var constants = require('../constants');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (!fs.existsSync('./uploads')) {
            fs.mkdirSync('./uploads');
        }
        let path = './uploads';
        callback(null, path);
    },
    filename(req, file, cb) {
        let fileExt = file.originalname.substring(file.originalname.lastIndexOf('.')).toLowerCase();
        if (!imageFilter(fileExt)) {
            return false;
        } else {
            cb(null, file.originalname);
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

module.exports = (function () {

    var router = express.Router();

    router.post('/upload', function (req, res) {
        var directory = 'uploads';
        fs.readdir(directory, (err, files) => {
            if (err) throw err;
            for (var file of files) {
                fs.unlink(path.join(directory, file), err => {
                    if (err) throw err;
                });
            }
        });
        upload(req, res, function (err) {
            if (err) {
                return res.status(404).json({
                    success: false,
                    message: 'File is too large. (Max 2MB)'
                });
            }

            var file = req.file;
            var base64str = base64_encode('./uploads/' + file.originalname);

            return res.status(200).json({
                success: true,
                url: 'http://' + ip.address() + ':' + constants.PORT + '/api/uploads/' + file.originalname,
                image: 'data:image/png;base64,' + base64str
            });
        });
    });

    return router;
})();

const imageFilter = function (fileExt) {
    // accept image only
    let imageTypes = ['.jpg', 'jpeg', '.png', '.gif', 'webp'];
    if (imageTypes.indexOf(fileExt) == -1) {
        return false;
    }
    return true;
};

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}