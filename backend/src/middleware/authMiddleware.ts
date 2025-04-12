import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

// Extend the Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

interface JwtPayload {
  id: string;
}
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log("Headers:", req.headers);
    
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      console.log("Token extracted:", token);
    }

    if (!token) {
      console.log("No token found");
      res.status(401).json({
        success: false,
        message: 'Not authorized to access this route',
      });
      return;
    }

    try {
      console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
      
      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;
      
      console.log("Decoded token:", decoded);

      
      // Find user
      const user = await User.findById(decoded.id);

      if (!user) {
        res.status(401).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      // Attach user to the request
      req.user = {
        id: user._id.toString(),
        role: user.role
      };

      next();
    } catch (error) {
      console.error("JWT verification error:", error);
      res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
      return;
    }
  } catch (error) {
    console.error("Middleware error:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error',
    });
  }
};