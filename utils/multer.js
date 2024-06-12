const multer = require('multer');
const path = require('path');
const { uploader } = require('./cloudinary');

// Specify the storage engine.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/multer_images'));
    },
    filename: (req, file, cb) => {
        if(file) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.originalname + '-' + uniqueSuffix);
        } else {
            cb(null, false);
        }
    }
});


// File validation.
const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')) { 
        cb(null, true);
    } else { 
        cb({ message: "Unsupported file format." }, false);
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

module.exports = upload;