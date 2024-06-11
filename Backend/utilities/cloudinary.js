const dotenv =require('dotenv');

dotenv.config({
    path:'../.env'
});
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage}=require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: `${process.env.NAME}`,
    api_key: `${process.env.KEY}`,
    api_secret: `${process.env.SECRET}`,
});
const storage = new CloudinaryStorage({
    cloudinary,
    folder:'bblogs'
});
module.exports = {cloudinary,storage};