const express = require('express');
const { body, validationResult } = require('express-validator');
const Vehicle = require('../models/Vehicle');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/vehicles
// @desc    Get all vehicles with filtering and pagination
// @access  Public
router.get('/', async (req, res) => {
    try {
        const {
            type,
            minPrice,
            maxPrice,
            minYear,
            maxYear,
            fuelType,
            transmission,
            city,
            search,
            page = 1,
            limit = 12,
            sort = '-createdAt'
        } = req.query;

        // Build query
        let query = { status: 'active' };

        if (type) query.type = type;
        if (fuelType) query.fuelType = fuelType;
        if (transmission) query.transmission = transmission;
        if (city) query['location.city'] = new RegExp(city, 'i');

        // Price range
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseInt(minPrice);
            if (maxPrice) query.price.$lte = parseInt(maxPrice);
        }

        // Year range
        if (minYear || maxYear) {
            query.year = {};
            if (minYear) query.year.$gte = parseInt(minYear);
            if (maxYear) query.year.$lte = parseInt(maxYear);
        }

        // Text search
        if (search) {
            query.$text = { $search: search };
        }

        // Execute query with pagination
        const vehicles = await Vehicle.find(query)
            .populate('seller', 'name phone city')
            .sort(sort)
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Vehicle.countDocuments(query);

        res.json({
            success: true,
            count: vehicles.length,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            vehicles
        });
    } catch (error) {
        console.error('Get vehicles error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching vehicles'
        });
    }
});

// @route   GET /api/vehicles/featured
// @desc    Get featured vehicles
// @access  Public
router.get('/featured', async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ 
            status: 'active', 
            featured: true 
        })
        .populate('seller', 'name phone city')
        .sort('-createdAt')
        .limit(6);

        res.json({
            success: true,
            count: vehicles.length,
            vehicles
        });
    } catch (error) {
        console.error('Get featured vehicles error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching featured vehicles'
        });
    }
});

// @route   GET /api/vehicles/:id
// @desc    Get single vehicle
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id)
            .populate('seller', 'name phone city email');

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found'
            });
        }

        // Increment views
        vehicle.views += 1;
        await vehicle.save();

        res.json({
            success: true,
            vehicle
        });
    } catch (error) {
        console.error('Get vehicle error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching vehicle'
        });
    }
});

// @route   POST /api/vehicles
// @desc    Create new vehicle listing
// @access  Private
router.post('/', [
    auth,
    body('title').notEmpty().withMessage('Title is required'),
    body('brand').notEmpty().withMessage('Brand is required'),
    body('model').notEmpty().withMessage('Model is required'),
    body('type').isIn(['car', 'bike']).withMessage('Type must be car or bike'),
    body('year').isInt({ min: 1990, max: new Date().getFullYear() }).withMessage('Invalid year'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('kilometers').isFloat({ min: 0 }).withMessage('Kilometers must be a positive number'),
    body('fuelType').isIn(['petrol', 'diesel', 'electric', 'cng', 'hybrid']).withMessage('Invalid fuel type'),
    body('transmission').isIn(['manual', 'automatic']).withMessage('Invalid transmission type'),
    body('registrationNumber').notEmpty().withMessage('Registration number is required'),
    body('rcNumber').notEmpty().withMessage('RC number is required'),
    body('description').notEmpty().withMessage('Description is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        // Check if registration number already exists
        const existingVehicle = await Vehicle.findOne({ 
            registrationNumber: req.body.registrationNumber.toUpperCase() 
        });
        
        if (existingVehicle) {
            return res.status(400).json({
                success: false,
                message: 'Vehicle with this registration number already exists'
            });
        }

        const vehicleData = {
            ...req.body,
            seller: req.user.id,
            registrationNumber: req.body.registrationNumber.toUpperCase()
        };

        const vehicle = await Vehicle.create(vehicleData);
        await vehicle.populate('seller', 'name phone city');

        res.status(201).json({
            success: true,
            message: 'Vehicle listed successfully',
            vehicle
        });
    } catch (error) {
        console.error('Create vehicle error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating vehicle listing'
        });
    }
});

// @route   PUT /api/vehicles/:id
// @desc    Update vehicle
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        let vehicle = await Vehicle.findById(req.params.id);

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found'
            });
        }

        // Check if user owns the vehicle or is admin
        if (vehicle.seller.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this vehicle'
            });
        }

        vehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('seller', 'name phone city');

        res.json({
            success: true,
            message: 'Vehicle updated successfully',
            vehicle
        });
    } catch (error) {
        console.error('Update vehicle error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating vehicle'
        });
    }
});

// @route   DELETE /api/vehicles/:id
// @desc    Delete vehicle
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found'
            });
        }

        // Check if user owns the vehicle or is admin
        if (vehicle.seller.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this vehicle'
            });
        }

        await Vehicle.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Vehicle deleted successfully'
        });
    } catch (error) {
        console.error('Delete vehicle error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting vehicle'
        });
    }
});

// @route   POST /api/vehicles/:id/inquiry
// @desc    Add inquiry to vehicle
// @access  Private
router.post('/:id/inquiry', [
    auth,
    body('message').notEmpty().withMessage('Message is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const vehicle = await Vehicle.findById(req.params.id);

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found'
            });
        }

        const inquiry = {
            user: req.user.id,
            message: req.body.message
        };

        vehicle.inquiries.push(inquiry);
        await vehicle.save();

        res.json({
            success: true,
            message: 'Inquiry sent successfully'
        });
    } catch (error) {
        console.error('Add inquiry error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while sending inquiry'
        });
    }
});

module.exports = router;