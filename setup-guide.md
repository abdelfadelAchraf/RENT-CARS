# RENT-CARS Project Setup and Deployment Guide

## Prerequisites

Before starting, make sure you have installed:
- Node.js (v18 or higher)
- npm or yarn
- Git
- VS Code

## Step 1: Clone and Setup the Project

### 1.1 Clone the Repository
```bash
git clone https://github.com/abdelfadelAchraf/RENT-CARS.git
cd RENT-CARS
```

### 1.2 Open in VS Code
```bash
code .
```

## Step 2: Backend Setup

### 2.1 Navigate to Backend Directory
```bash
cd backend
```

### 2.2 Install Dependencies
```bash
npm install
```

### 2.3 Create Environment File
Create a `.env` file in the `backend` directory with the following content:

```env
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
```

### 2.4 Start Backend Server
```bash
npm start
```

The backend should now be running on `http://localhost:5000`

## Step 3: Frontend Setup

### 3.1 Open New Terminal and Navigate to Frontend
```bash
cd frontend
```

### 3.2 Install Dependencies
```bash
npm install
```

### 3.3 Create Environment File
Create a `.env` file in the `frontend` directory with:

```env
VITE_API_URL=http://localhost:5000
```

### 3.4 Start Frontend Development Server
```bash
npm run dev
```

The frontend should now be running on `http://localhost:5173`

## Step 4: Verify Local Setup

1. Open your browser and go to `http://localhost:5173`
2. You should see the RENT-CARS homepage
3. Try creating an account to test the email verification system
4. Test the car listing and rental features

## Step 5: Deployment

### 5.1 Frontend Deployment (Vercel)

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy Frontend:**
```bash
cd frontend
vercel
```

4. **Set Environment Variables in Vercel:**
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings > Environment Variables
   - Add: `VITE_API_URL` with your backend URL

### 5.2 Backend Deployment Options

#### Option A: Railway (Recommended)

1. **Install Railway CLI:**
```bash
npm install -g @railway/cli
```

2. **Login to Railway:**
```bash
railway login
```

3. **Deploy Backend:**
```bash
cd backend
railway init
railway up
```

4. **Set Environment Variables:**
```bash
railway variables set MONGODB_URI="your-mongodb-uri"
railway variables set JWT_SECRET="your-jwt-secret"
# ... add all other environment variables
```

#### Option B: Render

1. Go to [render.com](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service
4. Set build command: `cd backend && npm install`
5. Set start command: `cd backend && npm start`
6. Add all environment variables in the dashboard

#### Option C: Heroku

1. **Install Heroku CLI**
2. **Login and Create App:**
```bash
heroku login
heroku create your-app-name
```

3. **Set Environment Variables:**
```bash
heroku config:set MONGODB_URI="your-mongodb-uri"
heroku config:set JWT_SECRET="your-jwt-secret"
# ... add all other variables
```

4. **Deploy:**
```bash
git subtree push --prefix backend heroku main
```

## Step 6: Update Frontend Environment for Production

After deploying your backend, update the frontend environment variable:

1. **For Vercel:**
   - Go to Vercel dashboard > Your project > Settings > Environment Variables
   - Update `VITE_API_URL` to your deployed backend URL

2. **Redeploy Frontend:**
```bash
cd frontend
vercel --prod
```

## Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Make sure your backend CORS configuration includes your frontend URL
   - Check that the API URL in frontend .env is correct

2. **Database Connection:**
   - Verify MongoDB URI is correct
   - Check if your IP is whitelisted in MongoDB Atlas

3. **Email Not Working:**
   - Verify Gmail app password is correct
   - Check if 2FA is enabled on your Gmail account

4. **Image Upload Issues:**
   - Verify Cloudinary credentials
   - Check file size limits

### VS Code Extensions (Recommended):

- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Auto Rename Tag
- Bracket Pair Colorizer
- GitLens

## Security Notes

⚠️ **Important Security Considerations:**

1. **Never commit .env files to Git**
2. **Use strong JWT secrets in production**
3. **Rotate API keys regularly**
4. **Use environment-specific configurations**
5. **Enable HTTPS in production**

## Next Steps

1. Set up monitoring (consider using services like Sentry)
2. Implement proper logging
3. Set up automated backups for your database
4. Configure domain name and SSL certificates
5. Set up CI/CD pipelines for automated deployments

## Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure all services (MongoDB, Cloudinary, Email) are properly configured
4. Check network connectivity and firewall settings