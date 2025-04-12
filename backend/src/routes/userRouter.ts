import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { deleteUser, updateUser } from '../controllers/authController';

const userRoutes = express.Router();

// Routes to update and delete user
userRoutes.put('/:id', protect, updateUser);
userRoutes.delete('/:id', protect, deleteUser);

export default userRoutes;
