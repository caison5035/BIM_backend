const cloudinary = require('cloudinary').v2;
const config = require('./../config/config');


// Cloudinary configuration settings
// This will be fetched from the .env file in the root directory
cloudinary.config({
    cloud_name: config.CLOUDINARY_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;