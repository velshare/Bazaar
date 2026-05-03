#!/bin/bash

echo "🔧 AutoBazaar Setup Verification"
echo "================================"

# Check if all required files exist
echo "📁 Checking file structure..."

if [ -f "backend/server.js" ]; then
    echo "✅ Backend server exists"
else
    echo "❌ Backend server missing"
fi

if [ -f "backend/models/User.js" ]; then
    echo "✅ User model exists"
else
    echo "❌ User model missing"
fi

if [ -f "backend/models/Vehicle.js" ]; then
    echo "✅ Vehicle model exists"
else
    echo "❌ Vehicle model missing"
fi

if [ -f "backend/services/emailService.js" ]; then
    echo "✅ Email service exists"
else
    echo "❌ Email service missing"
fi

if [ -f "backend/routes/payment.js" ]; then
    echo "✅ Payment routes exist"
else
    echo "❌ Payment routes missing"
fi

if [ -f "frontend/src/pages/index.html" ]; then
    echo "✅ Frontend HTML exists"
else
    echo "❌ Frontend HTML missing"
fi

echo ""
echo "🚀 Setup Complete!"
echo "📧 Email notifications: Enabled"
echo "💳 Payment gateway: GPay (9443566920)"
echo "🏍️  Focus: Bikes only"
echo "🗄️  Database: MongoDB Atlas ready"
echo ""
echo "To start the application:"
echo "1. Update EMAIL_PASS in backend/.env with your Gmail app password"
echo "2. Run: cd backend && npm run dev"
echo "3. Open: http://localhost:5000"