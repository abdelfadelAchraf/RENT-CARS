// backend/src/routes/authRoutes.ts
import express from 'express';
import {  login, register } from '../controllers/authController';
const authRoutes = express.Router();

// Routes
authRoutes.post('/register', register);
authRoutes.post('/login', login);
// authRoutes.get('/me', getMe);

export default authRoutes;