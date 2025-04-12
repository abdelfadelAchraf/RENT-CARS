// backend/src/interfaces/index.ts
import { Document } from 'mongoose';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  profileImage: string;
  role: 'user' | 'renter';
  joinedDate: Date;
  responseRate: number;
  responseTime: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  createdAt: Date;
  updatedAt: Date;
  getSignedJwtToken(): string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

export interface IOwner {
  _id: string;
  name: string;
  profileImage: string;
  joinedDate: Date;
  responseRate: number;
  responseTime: string;
}

export interface IAvailableDates {
  start: Date;
  end: Date;
}

export interface ISpecs {
  passengers: number;
  luggage: number;
  range: string;
  fuelType: string;
}

export interface ICar {
  _id: string;  // This conflicts with Document._id so we'll omit it in the document interface
  id: string;   // This is our custom ID field
  name: string;
  images: string[];
  rating: number;
  type: string;
  location: string;
  reviewCount: number;
  passengers: number;
  transmission: string;
  airConditioning: boolean;
  doors: number;
  price: number;
  category: string;
  description: string;
  features: string[];
  specs: ISpecs;
  owner: string | IOwner;
  availableDates: IAvailableDates[];
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends Omit<IUser, '_id'>, Document {}

export interface IDecodedToken {
  id: string;
  iat: number;
  exp: number;
}

export interface AuthRequest extends Request {
  userId?: string;
}