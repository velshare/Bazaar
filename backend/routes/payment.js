const express = require('express');
const { body, validationResult } = require('express-validator');
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { sendPurchaseConfirmation } = require('../services/emailService');

const router = express.Router();

// @route   POST /api/payment/initiate
// @desc    Initiate payment for bike purchase
// @access  Private
router.post('/initiate', [
    auth,
    body('bikeId').notEmpty().withMessage('Bike ID is required'),
    body('paymentMethod').equals('gpay').withMessage('Only GPay payment is supported')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { bikeId } = req.body;
        const bike = await Vehicle.findById(bikeId).populate('seller', 'name phone');

        if (!bike) {
            return res.status(404).json({
                success: false,
                message: 'Bike not found'
            });
        }

        if (bike.status !== 'active') {
            return res.status(400).json({
                success: false,
                message: 'Bike is not available for purchase'
            });
        }

        // Generate payment details
        const paymentDetails = {
            bikeId: bike._id,
            bikeTitle: bike.title,
            price: bike.price,
            gpayNumber: process.env.GPAY_NUMBER,
            paymentId: `PAY_${Date.now()}_${bike._id}`,
            buyerId: req.user.id,
            sellerId: bike.seller._id
        };

        res.json({
            success: true,
            message: 'Payment initiated successfully',
            paymentDetails
        });
    } catch (error) {
        console.error('Payment initiation error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during payment initiation'
        });
    }
});

// @route   POST /api/payment/confirm
// @desc    Confirm payment completion
// @access  Private
router.post('/confirm', [
    auth,
    body('paymentId').notEmpty().withMessage('Payment ID is required'),
    body('transactionId').notEmpty().withMessage('Transaction ID is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { transactionId, bikeId, bikeName, bikePrice } = req.body;

        // req.user is set by auth middleware (from JWT, no DB needed)
        const userEmail = req.user.email;
        const userName = req.user.name || 'Customer';

        // Build bike details — try DB, fallback to frontend data
        let bikeDetails;
        try {
            const bike = await Vehicle.findById(bikeId);
            if (bike) {
                bike.status = 'sold';
                await bike.save();
                bikeDetails = { title: bike.title, price: bike.price, year: bike.year, brand: bike.brand };
            }
        } catch { /* DB unavailable */ }

        if (!bikeDetails) {
            bikeDetails = { title: bikeName || 'Bike', brand: bikeName || 'AutoBazaar', price: bikePrice || '0', year: new Date().getFullYear() };
        }

        if (userEmail) {
            await sendPurchaseConfirmation(userEmail, userName, bikeDetails);
        }

        res.json({
            success: true,
            message: 'Payment confirmed! Purchase confirmation email sent.',
            transactionId
        });
    } catch (error) {
        console.error('Payment confirmation error:', error);
        res.status(500).json({ success: false, message: 'Server error during payment confirmation' });
    }
});

module.exports = router;