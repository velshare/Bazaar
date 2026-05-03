const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide bike title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    brand: {
        type: String,
        required: [true, 'Please provide bike brand'],
        trim: true
    },
    model: {
        type: String,
        required: [true, 'Please provide bike model'],
        trim: true
    },
    type: {
        type: String,
        default: 'bike',
        enum: ['bike']
    },
    year: {
        type: Number,
        required: [true, 'Please provide manufacturing year'],
        min: [1990, 'Year must be 1990 or later'],
        max: [new Date().getFullYear(), 'Year cannot be in the future']
    },
    price: {
        type: Number,
        required: [true, 'Please provide price'],
        min: [0, 'Price cannot be negative']
    },
    kilometers: {
        type: Number,
        required: [true, 'Please provide kilometers driven'],
        min: [0, 'Kilometers cannot be negative']
    },
    fuelType: {
        type: String,
        required: [true, 'Please specify fuel type'],
        enum: ['petrol', 'electric'],
        lowercase: true
    },
    transmission: {
        type: String,
        required: [true, 'Please specify transmission type'],
        enum: ['manual', 'automatic'],
        lowercase: true
    },
    registrationNumber: {
        type: String,
        required: [true, 'Please provide registration number'],
        unique: true,
        uppercase: true,
        trim: true
    },
    rcNumber: {
        type: String,
        required: [true, 'Please provide RC number'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide bike description'],
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    images: [{
        url: {
            type: String,
            required: true
        },
        publicId: {
            type: String,
            required: true
        }
    }],
    location: {
        city: {
            type: String,
            required: [true, 'Please provide city'],
            trim: true
        },
        state: {
            type: String,
            required: [true, 'Please provide state'],
            trim: true
        },
        pincode: {
            type: String,
            match: [/^[0-9]{6}$/, 'Please provide a valid pincode']
        }
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'sold', 'inactive'],
        default: 'active'
    },
    featured: {
        type: Boolean,
        default: false
    },
    verified: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0
    },
    inquiries: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        message: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

// Index for search functionality
vehicleSchema.index({ title: 'text', brand: 'text', model: 'text', description: 'text' });
vehicleSchema.index({ type: 1, status: 1 });
vehicleSchema.index({ price: 1 });
vehicleSchema.index({ year: 1 });
vehicleSchema.index({ 'location.city': 1 });

module.exports = mongoose.model('Vehicle', vehicleSchema);