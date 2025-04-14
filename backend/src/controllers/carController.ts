// src/controllers/carController.ts
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

// Create new car - UPDATED to handle direct multipart/form-data upload
export const createCar = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Creating car with request body:', req.body);
    console.log('Files received:', req.files);
    
    // Set owner to current user
    req.body.owner = req.user?.id;
    
    // Handle uploaded images
    if (req.files && Array.isArray(req.files)) {
      req.body.images = (req.files as Express.Multer.File[]).map((file: any) => file.path);
      console.log('Image paths:', req.body.images);
    } else {
      console.log('No files were uploaded or files is not an array');
    }
    
    // Parse specs if needed
    if (req.body.specs && typeof req.body.specs === 'string') {
      try {
        req.body.specs = JSON.parse(req.body.specs);
      } catch (e) {
        console.log('Error parsing specs JSON, using as-is');
        // If specs is passed as individual fields, construct the object
        req.body.specs = {
          passengers: req.body['specs[passengers]'] || req.body.passengers,
          luggage: req.body['specs[luggage]'] || req.body.luggage,
          range: req.body['specs[range]'] || req.body.range,
          fuelType: req.body['specs[fuelType]'] || req.body.fuelType
        };
      }
    } else if (!req.body.specs) {
      // Construct specs object from individual fields
      req.body.specs = {
        passengers: req.body['specs[passengers]'] || req.body.passengers,
        luggage: req.body['specs[luggage]'] || req.body.luggage,
        range: req.body['specs[range]'] || req.body.range,
        fuelType: req.body['specs[fuelType]'] || req.body.fuelType
      };
    }
    
    // Handle boolean conversion for airConditioning
    if (req.body.airConditioning === 'true') {
      req.body.airConditioning = true;
    } else if (req.body.airConditioning === 'false') {
      req.body.airConditioning = false;
    }
    
    // Handle features - ensure it's an array
    if (req.body.features && !Array.isArray(req.body.features)) {
      req.body.features = [req.body.features];
    }
    
    // Handle numeric conversions
    if (req.body.passengers) req.body.passengers = Number(req.body.passengers);
    if (req.body.doors) req.body.doors = Number(req.body.doors);
    if (req.body.price) req.body.price = Number(req.body.price);
    if (req.body.specs && req.body.specs.passengers) req.body.specs.passengers = Number(req.body.specs.passengers);
    if (req.body.specs && req.body.specs.luggage) req.body.specs.luggage = Number(req.body.specs.luggage);
    
    console.log('Final car data to be saved:', req.body);
    
    const car = await Car.create(req.body);
    
    res.status(201).json({
      success: true,
      data: car
    });
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error'
    });
  }
};

// Update car - UPDATED to handle multipart/form-data
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
    
    // Handle uploaded images if any
    if (req.files && Array.isArray(req.files)) {
      // Extract the Cloudinary URLs from the uploaded files
      req.body.images = (req.files as Express.Multer.File[]).map((file: any) => file.path);
    }
    
    // Parse specs if needed
    if (req.body.specs && typeof req.body.specs === 'string') {
      try {
        req.body.specs = JSON.parse(req.body.specs);
      } catch (e) {
        // If specs is passed as individual fields, construct the object
        req.body.specs = {
          passengers: req.body['specs[passengers]'] || req.body.passengers,
          luggage: req.body['specs[luggage]'] || req.body.luggage,
          range: req.body['specs[range]'] || req.body.range,
          fuelType: req.body['specs[fuelType]'] || req.body.fuelType
        };
      }
    } else if (!req.body.specs) {
      // Construct specs object from individual fields
      req.body.specs = {
        passengers: req.body['specs[passengers]'] || req.body.passengers,
        luggage: req.body['specs[luggage]'] || req.body.luggage,
        range: req.body['specs[range]'] || req.body.range,
        fuelType: req.body['specs[fuelType]'] || req.body.fuelType
      };
    }
    
    // Handle boolean conversion for airConditioning
    if (req.body.airConditioning === 'true') {
      req.body.airConditioning = true;
    } else if (req.body.airConditioning === 'false') {
      req.body.airConditioning = false;
    }
    
    // Handle features - ensure it's an array
    if (req.body.features && !Array.isArray(req.body.features)) {
      req.body.features = [req.body.features];
    }
    
    // Handle numeric conversions
    if (req.body.passengers) req.body.passengers = Number(req.body.passengers);
    if (req.body.doors) req.body.doors = Number(req.body.doors);
    if (req.body.price) req.body.price = Number(req.body.price);
    if (req.body.specs && req.body.specs.passengers) req.body.specs.passengers = Number(req.body.specs.passengers);
    if (req.body.specs && req.body.specs.luggage) req.body.specs.luggage = Number(req.body.specs.luggage);
    
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

// Get all cars for the current user
export const getUserCars = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      res.status(401).json({ 
        success: false, 
        message: 'Not authorized' 
      });
      return;
    }

    const cars = await Car.find({ owner: userId }).populate('owner', 'name email profileImage');
    
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

// Update car availability
export const updateCarAvailability = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ 
        success: false, 
        message: 'Not authorized' 
      });
      return;
    }

    if (typeof isAvailable !== 'boolean') {
      res.status(400).json({ 
        success: false, 
        message: 'Invalid availability status' 
      });
      return;
    }

    const car = await Car.findOne({ _id: id, owner: userId });

    if (!car) {
      res.status(404).json({ 
        success: false, 
        message: 'Car not found or not owned by user' 
      });
      return;
    }

    car.isAvailable = isAvailable;
    await car.save();
    
    res.status(200).json({
      success: true,
      data: car,
      message: `Car is now ${car.isAvailable ? 'available' : 'unavailable'} for rent`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error'
    });
  }
};