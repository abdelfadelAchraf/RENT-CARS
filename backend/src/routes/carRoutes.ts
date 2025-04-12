// backend/src/routes/carRoutes.ts
import express from 'express';
import { createCar, getAllCars, getCarById } from '../controllers/carController';



const carRoutes = express.Router();

// Public routes
carRoutes.get('/', getAllCars);
carRoutes.get('/:id', getCarById);

// Protected routes
carRoutes.post('/', createCar);
// carRoutes.put('/:id', protect, updateCar);
// carRoutes.delete('/:id', protect, deleteCar);

export default carRoutes;