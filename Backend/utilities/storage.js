const multer =require('multer');
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        return cb(null, file.fieldname + '-' + uniqueSuffix+ext)
    }
})
module.exports = {storage};
