// src/routes/carRoutes.ts
import express from 'express';
import { createCar, deleteCar, getAllCars, getCar, updateCar } from '../controllers/carController';
import { protect } from '../middleware/authMiddleware';
import { upload } from '../config/cloudinary';

const carRoutes = express.Router();

// Public routes
carRoutes.get('/', getAllCars);
carRoutes.get('/:id', getCar);

// Protected routes with image upload
carRoutes.post('/', protect, upload.array('images', 5), createCar);
carRoutes.put('/:id', protect, upload.array('images', 5), updateCar);
carRoutes.delete('/:id', protect, deleteCar);

export default carRoutes;