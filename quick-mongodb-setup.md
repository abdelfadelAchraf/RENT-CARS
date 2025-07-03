# Quick MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account
1. Go to [https://cloud.mongodb.com/](https://cloud.mongodb.com/)
2. Sign up for a free account or sign in

## Step 2: Create a New Cluster
1. Click "Build a Database"
2. Choose "M0 Sandbox" (Free tier)
3. Select AWS, Google Cloud, or Azure
4. Choose a region close to you
5. Name your cluster: `RentCarsCluster`
6. Click "Create Cluster"

## Step 3: Create Database User
1. While cluster is creating, go to "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Choose "Password" authentication method
4. Username: `rentcars_admin`
5. Click "Autogenerate Secure Password" and SAVE the password
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

## Step 4: Configure Network Access
1. Go to "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

## Step 5: Get Connection String
1. Go back to "Database" (left sidebar)
2. Wait for cluster to finish creating
3. Click "Connect" button
4. Choose "Connect your application"
5. Select "Node.js" and version "4.1 or later"
6. Copy the connection string
7. Replace `<password>` with the password you saved
8. Replace `myFirstDatabase` with `rentcars`

## Step 6: Update Your .env File
Replace the MONGODB_URI in your backend/.env file with your new connection string.

Example:
```
MONGODB_URI="mongodb+srv://rentcars_admin:YOUR_PASSWORD_HERE@rentcarscluster.abc123.mongodb.net/rentcars?retryWrites=true&w=majority"
```

## Step 7: Test Connection
1. Save the .env file
2. Restart your backend server: `npm start`
3. Look for "MongoDB connected" message