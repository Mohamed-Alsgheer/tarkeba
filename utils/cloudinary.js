// const { Result } = require('express-validator');
// const { file } = require('googleapis/build/src/apis/file');

const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

function uploads (file, folder) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file, {
            resource_type: "auto",
            folder: folder
        }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve({
                    public_id: result.public_id,
                    url: result.url
                });
            }
        });
    });
}

function destroys(publicId) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
            if(error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

function destroyFolder(folder) {
    return new Promise((resolve, reject) => {
        cloudinary.api.delete_folder(folder, (error, result) => {
            if(error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = { uploads, destroys, destroyFolder };