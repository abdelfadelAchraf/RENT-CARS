// 

import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { 
  register, 
  login, 
  getMe, 
  updateUser, 
  deleteUser,
  updateProfileImage,
  logout
} from '../controllers/authController';
import { upload } from '../config/cloudinary';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/update', protect, updateUser);
router.put('/update-image', protect, upload.single('profileImage'), updateProfileImage);
router.delete('/delete', protect, deleteUser);
router.post('/logout', protect, logout);

export default router;