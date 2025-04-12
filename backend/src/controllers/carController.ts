import { Request, Response } from 'express';
import Car from '../models/carModel';

// Interface for AuthRequest
interface AuthRequest extends Request {
  userId?: string;
}

// @desc    Get all cars
// @route   GET /api/cars
// @access  Public
export const getAllCars = async (req: Request, res: Response) => {
  try {
    const cars = await Car.find().populate({
      path: 'owner',
      select: 'name profileImage joinedDate responseRate responseTime'
    });
    
    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get car by ID
// @route   GET /api/cars/:id
// @access  Public
export const getCarById = async (req: Request, res: Response):Promise<void> => {
  try {
    const car = await Car.findOne({ id: req.params.id }).populate({
      path: 'owner',
      select: 'name profileImage joinedDate responseRate responseTime'
    });
    
    if (!car) {
       res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: car
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new car
// @route   POST /api/cars
// @access  Private
export const createCar = async (req: AuthRequest, res: Response) => {
  try {
    // Add owner to req.body
    req.body.owner = req.userId;
    
    const car = await Car.create(req.body);
    
    res.status(201).json({
      success: true,
      data: car
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update car
// @route   PUT /api/cars/:id
// @access  Private
export const updateCar = async (req: AuthRequest, res: Response) => {
  try {
    let car = await Car.findOne({ id: req.params.id });
    
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }
    
    // Make sure user is car owner
    if (car.owner.toString() !== req.userId) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this car'
      });
    }
    
    car = await Car.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: car
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete car
// @route   DELETE /api/cars/:id
// @access  Private
export const deleteCar = async (req: AuthRequest, res: Response) => {
  try {
    const car = await Car.findOne({ id: req.params.id });
    
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }
    
    // Make sure user is car owner
    if (car.owner.toString() !== req.userId) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this car'
      });
    }
    
    await Car.deleteOne({ id: req.params.id });
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};