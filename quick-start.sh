#!/bin/bash

echo "🚗 RENT-CARS Quick Start Script"
echo "================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Clone repository if not already cloned
if [ ! -d "RENT-CARS" ]; then
    echo "📥 Cloning repository..."
    git clone https://github.com/abdelfadelAchraf/RENT-CARS.git
    cd RENT-CARS
else
    echo "📁 Repository already exists, entering directory..."
    cd RENT-CARS
fi

# Setup Backend
echo "🔧 Setting up Backend..."
cd backend

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating backend .env file..."
    cat > .env << EOL
MONGODB_URI="mongodb+srv://achrafabdelfadel416:VovnZ6n1lkkuTyaP@clusterrentcar.ejvwpxp.mongodb.net/?retryWrites=true&w=majority&appName=ClusterRentCar"
PORT=5000
JWT_SECRET=1234567890HRAF
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=dqvwtjzmd
CLOUDINARY_API_KEY=438388898879662
CLOUDINARY_API_SECRET=hfyuWBHOB31OYK3J-neXFI00T1o
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER="achrafabdelfadel416@gmail.com"
EMAIL_PASSWORD="ewwh pekl nbii evqf"
EMAIL_FROM_NAME=Car.Rental.ma
EMAIL_FROM="achrafabdelfadel416@gmail.com"
EOL
    echo "✅ Backend .env file created"
else
    echo "✅ Backend .env file already exists"
fi

# Setup Frontend
echo "🔧 Setting up Frontend..."
cd ../frontend

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating frontend .env file..."
    cat > .env << EOL
VITE_API_URL=http://localhost:5000
EOL
    echo "✅ Frontend .env file created"
else
    echo "✅ Frontend .env file already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the application:"
echo "1. Start the backend: cd backend && npm start"
echo "2. Start the frontend: cd frontend && npm run dev"
echo ""
echo "The application will be available at:"
echo "- Frontend: http://localhost:5173"
echo "- Backend API: http://localhost:5000"
echo ""
echo "Happy coding! 🚗💨"