import express from 'express';
import { upload } from '../config/cloudinary';
import { uploadImage } from '../controllers/imageController';

const imageRoute = express.Router();

// Single image upload route
imageRoute.post('/upload', upload.single('image'), uploadImage);

export default imageRoute;