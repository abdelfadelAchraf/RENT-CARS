import { Request, Response } from 'express';
import Car from '../models/carModel';

// Get all cars
export const getAllCars = async (req: Request, res: Response): Promise<void> => {
  try {
    const cars = await Car.find().populate('owner', 'name email profileImage');
    
    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error'
    });
  }
};

// Get single car
export const getCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const car = await Car.findById(req.params.id).populate('owner', 'name email profileImage');
    
    if (!car) {
      res.status(404).json({ success: false, message: 'Car not found' });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: car
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error'
    });
  }
};

// Create new car
export const createCar = async (req: Request, res: Response): Promise<void> => {
  try {
    // Set owner to current user
    console.log("hello world")
    req.body.owner = req.user?.id;
    // console.log("---1:",  req.body.owner)
    const car = await Car.create(req.body);
    
    res.status(201).json({
      success: true,
      data: car
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error'
    });
  }
};

// Update car
export const updateCar = async (req: Request, res: Response): Promise<void> => {
  try {
    let car = await Car.findById(req.params.id);
    
    if (!car) {
      res.status(404).json({ success: false, message: 'Car not found' });
      return;
    }
    
    // Check if user is car owner
    if (car.owner.toString() !== req.user?.id && req.user?.role !== 'admin') {
      res.status(403).json({ success: false, message: 'Not authorized to update this car' });
      return;
    }
    
    car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: car
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error'
    });
  }
};

// Delete car
export const deleteCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      res.status(404).json({ success: false, message: 'Car not found' });
      return;
    }
    
    // Check if user is car owner
    if (car.owner.toString() !== req.user?.id && req.user?.role !== 'admin') {
      res.status(403).json({ success: false, message: 'Not authorized to delete this car' });
      return;
    }
    
    await car.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error'
    });
  }
};