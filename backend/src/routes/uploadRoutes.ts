// src/routes/uploadRoutes.ts
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { protect } from '../middleware/authMiddleware';

// Set up storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = 'uploads/';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
  }
});

// Check file type
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'));
  }
  cb(null, true);
};

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB
  fileFilter: fileFilter
});

const uploadRouter = express.Router();

// Upload multiple images
uploadRouter.post('/', protect, upload.array('images', 10), (req: express.Request, res: express.Response): void => {
  try {
    if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
       res.status(400).json({ message: 'Please upload at least one image' });
    }

    // Get array of file paths
    const imageUrls = (req.files as Express.Multer.File[]).map(file => {
      // Return a URL that the frontend can use to access the image
      return `/uploads/${file.filename}`;
    });

    res.status(200).json({
      success: true,
      message: 'Images uploaded successfully',
      imageUrls: imageUrls
    });
  } catch (error) {
    res.status(500).json({
      success: false, 
      message: 'Error uploading images'
    });
  }
});

export default uploadRouter;