const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                city: user.city,
                address: user.address,
                userType: user.userType,
                role: user.role,
                profileImage: user.profileImage,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching profile'
        });
    }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', [
    auth,
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('phone').optional().matches(/^[0-9]{10}$/).withMessage('Please provide a valid phone number'),
    body('city').optional().notEmpty().withMessage('City cannot be empty'),
    body('address').optional().notEmpty().withMessage('Address cannot be empty')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { name, phone, city, address, userType } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                ...(name && { name }),
                ...(phone && { phone }),
                ...(city && { city }),
                ...(address && { address }),
                ...(userType && { userType })
            },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                city: user.city,
                address: user.address,
                userType: user.userType,
                role: user.role,
                profileImage: user.profileImage
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating profile'
        });
    }
});

// @route   GET /api/users/my-vehicles
// @desc    Get user's vehicles
// @access  Private
router.get('/my-vehicles', auth, async (req, res) => {
    try {
        const { status = 'all', page = 1, limit = 10 } = req.query;

        let query = { seller: req.user.id };
        if (status !== 'all') {
            query.status = status;
        }

        const vehicles = await Vehicle.find(query)
            .sort('-createdAt')
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
        console.error('Get my vehicles error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching vehicles'
        });
    }
});

// @route   GET /api/users/dashboard
// @desc    Get user dashboard data
// @access  Private
router.get('/dashboard', auth, async (req, res) => {
    try {
        const userId = req.user.id;

        // Get vehicle statistics
        const totalVehicles = await Vehicle.countDocuments({ seller: userId });
        const activeVehicles = await Vehicle.countDocuments({ seller: userId, status: 'active' });
        const soldVehicles = await Vehicle.countDocuments({ seller: userId, status: 'sold' });

        // Get total views
        const vehicles = await Vehicle.find({ seller: userId });
        const totalViews = vehicles.reduce((sum, vehicle) => sum + vehicle.views, 0);

        // Get total inquiries
        const totalInquiries = vehicles.reduce((sum, vehicle) => sum + vehicle.inquiries.length, 0);

        // Get recent vehicles
        const recentVehicles = await Vehicle.find({ seller: userId })
            .sort('-createdAt')
            .limit(5)
            .select('title price status views createdAt');

        res.json({
            success: true,
            dashboard: {
                statistics: {
                    totalVehicles,
                    activeVehicles,
                    soldVehicles,
                    totalViews,
                    totalInquiries
                },
                recentVehicles
            }
        });
    } catch (error) {
        console.error('Get dashboard error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching dashboard data'
        });
    }
});

// @route   PUT /api/users/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password', [
    auth,
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { currentPassword, newPassword } = req.body;

        // Get user with password
        const user = await User.findById(req.user.id).select('+password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check current password
        const isMatch = await user.matchPassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while changing password'
        });
    }
});

// @route   DELETE /api/users/account
// @desc    Delete user account
// @access  Private
router.delete('/account', auth, async (req, res) => {
    try {
        // Delete user's vehicles
        await Vehicle.deleteMany({ seller: req.user.id });

        // Delete user account
        await User.findByIdAndDelete(req.user.id);

        res.json({
            success: true,
            message: 'Account deleted successfully'
        });
    } catch (error) {
        console.error('Delete account error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting account'
        });
    }
});

module.exports = router;