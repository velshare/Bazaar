const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const testConnection = async () => {
    try {
        console.log('🔄 Testing MongoDB Atlas connection...');
        
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('✅ MongoDB Atlas connected successfully!');
        console.log(`📍 Connected to: ${mongoose.connection.host}`);
        console.log(`🗄️  Database: ${mongoose.connection.name}`);
        
        process.exit(0);
    } catch (error) {
        console.error('❌ MongoDB Atlas connection failed:');
        console.error(error.message);
        process.exit(1);
    }
};

testConnection();