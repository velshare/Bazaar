#!/bin/bash

echo "🚀 Starting AutoBazaar Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Navigate to backend directory
cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Please configure your environment variables."
    echo "📝 Copy the .env file and update with your MongoDB Atlas credentials."
fi

echo "🌟 Starting the server..."
echo "🌐 Frontend will be available at: http://localhost:5000"
echo "🔌 API will be available at: http://localhost:5000/api"
echo ""

# Start the application
npm run dev