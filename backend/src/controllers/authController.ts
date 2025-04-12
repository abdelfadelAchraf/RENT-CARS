import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';

// Interface for AuthRequest
interface AuthRequest extends Request {
  userId?: string;
}

// Helper function to generate JWT
const generateToken = (id: string): string => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET as string,
    { expiresIn: '30d' } // Set a longer expiration - 30 days
  );
};
// const token = jwt.sign(
//   { id: user._id },
//   process.env.JWT_SECRET as string,
//   { expiresIn: '30d' } // Set a longer expiration - 30 days
// );
// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Generate token
    const token = generateToken(user._id.toString());

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if user exists before comparing password
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
      return;
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user._id.toString());

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private
export const updateUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, email, profileImage } = req.body;

    // Ensure the user is updating their own profile
    if (req.userId !== req.params.id) {
      res.status(403).json({
        success: false,
        message: 'You are not authorized to update this profile',
      });
      return;
    }

    // Find the user to update
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (profileImage) user.profileImage = profileImage;

    // Save updated user
    await user.save();

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// @desc    Delete user account
// @route   DELETE /api/users/:id
// @access  Private
export const deleteUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Ensure the user is deleting their own account
    if (req.userId !== req.params.id) {
      res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this account',
      });
      return;
    }

    // Find the user to delete
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    // Delete user
    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
