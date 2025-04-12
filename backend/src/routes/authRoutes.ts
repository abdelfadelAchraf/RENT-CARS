import express from 'express';
import {  deleteUser, login, register, updateUser } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
const authRoutes = express.Router();

// Routes
authRoutes.post('/register', register);
authRoutes.post('/login', login);
// Routes to update and delete user
authRoutes.put('/:id', protect, updateUser);
authRoutes.delete('/:id', protect, deleteUser);

export default authRoutes;