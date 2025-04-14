// src/routes/imageRoute.ts
import express from 'express';
import { upload } from '../config/cloudinary';

const imageRoute = express.Router();

// Updated to handle multiple images
imageRoute.post('/upload', upload.array('images', 5), async (req, res): Promise<void> => {
  try {
    console.log('Upload request received:', req.files);
    
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
       res.status(400).json({
        success: false,
        message: 'Please upload at least one image'
      });
    }
    
    // Extract image URLs from the uploaded files
    const imageUrls = (req.files as Express.Multer.File[]).map((file: any) => file.path);
    
    console.log('Uploaded image URLs:', imageUrls);
    
    res.status(200).json({
      success: true,
      imageUrls: imageUrls
    });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error'
    });
  }
});

export default imageRoute;