import mongoose, { Document, Model } from 'mongoose';



const carSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: [true, 'Please provide a car name'],
        trim: true
    },
    images: {
        type: [String],
        required: [true, 'Please provide at least one image']
    },
    rating: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        required: [true, 'Please specify car type']
    },
    location: {
        type: String,
        required: [true, 'Please provide location']
    },
    reviewCount: {
        type: Number,
        default: 0
    },
    passengers: {
        type: Number,
        required: [true, 'Please specify passenger capacity']
    },
    transmission: {
        type: String,
        required: [true, 'Please specify transmission type']
    },
    airConditioning: {
        type: Boolean,
        default: false
    },
    doors: {
        type: Number,
        required: [true, 'Please specify number of doors']
    },
    price: {
        type: Number,
        required: [true, 'Please specify price per day']
    },
    category: {
        type: String,
        required: [true, 'Please specify car category']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    features: {
        type: [String],
        default: []
    },
    specs: {
        passengers: Number,
        luggage: Number,
        range: String,
        fuelType: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please specify the car owner']
    },
    availableDates: [
        {
            start: Date,
            end: Date
        }
    ],
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Car = mongoose.model('Car', carSchema);
export default Car;