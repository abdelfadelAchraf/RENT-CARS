import express from 'express';
import { createCar, deleteCar, getAllCars, getCar, updateCar } from '../controllers/carController';
import { protect } from '../middleware/authMiddleware';
// import { getAllCars, getCarById } from '../controllers/carController';
// import { protect } from '../middleware/authMiddleware';



const carRoutes = express.Router();

// // Public routes
carRoutes.get('/', getAllCars);
 carRoutes.get('/:id', getCar);

// // Protected routes
carRoutes.post('/', protect, createCar);
 carRoutes.put('/:id', protect, updateCar);
 carRoutes.delete('/:id', protect, deleteCar);
export default carRoutes;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZmFlNmY5MzIwNmYxN2RhMzAzNjJmOSIsImlhdCI6MTc0NDQ5NjM5NCwiZXhwIjoxNzQ3MDg4Mzk0fQ.V8kQfHgle_pX8cpGu-WVpe7lobgLoBJb_Zh6rtSUfNk