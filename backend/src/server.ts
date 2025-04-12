// backend/src/server.ts
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import mongoose from 'mongoose';
import connectDB from './config/connectDb';

// // Import routes
// import authRoutes from './routes/authRoutes.js';
// import carRoutes from './routes/carRoutes.js';

// Load environment variables
import 'dotenv/config'
import authRoutes from './routes/authRoutes';
import carRoutes from './routes/carRoutes';
// import carRoutes from './routes/carRoutes';

// Initialize express app
const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGO_DB_URI = process.env.MONGODB_URI;
if (!MONGO_DB_URI) {
    throw new Error('MONGODB_URI is not defined in the environment variables');
}
connectDB(MONGO_DB_URI);

// Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/cars', carRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

  /*
app.use('*', (req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
  });
  */
// Basic route
app.get('/', (req: Request, res: Response) => {
    res.send('Car Rental API is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});