const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const router = express.Router();

// Create email transporter
const createTransporter = () => {
    return nodemailer.createTransporter({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

// @route   POST /api/contact
// @desc    Handle contact form submission
// @access  Public
router.post('/', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('phone').matches(/^[0-9]{10}$/).withMessage('Please provide a valid phone number'),
    body('service').notEmpty().withMessage('Service selection is required'),
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

        const { name, email, phone, service, message } = req.body;

        // Create email content
        const emailContent = `
            <h2>New Contact Form Submission - AutoBazaar</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr>
            <p><small>This message was sent from AutoBazaar contact form.</small></p>
        `;

        // Auto-reply content
        const autoReplyContent = `
            <h2>Thank you for contacting AutoBazaar!</h2>
            <p>Dear ${name},</p>
            <p>We have received your message and will get back to you within 24 hours.</p>
            <p><strong>Your Message:</strong></p>
            <p>${message}</p>
            <br>
            <p>Best regards,<br>AutoBazaar Team</p>
            <hr>
            <p><small>This is an automated response. Please do not reply to this email.</small></p>
        `;

        // Send email to admin
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
                const transporter = createTransporter();

                // Send to admin
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: process.env.EMAIL_USER,
                    subject: `New Contact Form Submission - ${service}`,
                    html: emailContent
                });

                // Send auto-reply to user
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'Thank you for contacting AutoBazaar',
                    html: autoReplyContent
                });

                console.log('Contact emails sent successfully');
            } catch (emailError) {
                console.error('Email sending error:', emailError);
                // Don't fail the request if email fails
            }
        }

        res.json({
            success: true,
            message: 'Thank you for your message! We will contact you within 24 hours.'
        });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while processing contact form'
        });
    }
});

// @route   POST /api/contact/inquiry
// @desc    Handle vehicle inquiry
// @access  Public
router.post('/inquiry', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('phone').matches(/^[0-9]{10}$/).withMessage('Please provide a valid phone number'),
    body('vehicleId').notEmpty().withMessage('Vehicle ID is required'),
    body('vehicleName').notEmpty().withMessage('Vehicle name is required'),
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

        const { name, email, phone, vehicleId, vehicleName, message } = req.body;

        // Create inquiry email content
        const inquiryContent = `
            <h2>New Vehicle Inquiry - AutoBazaar</h2>
            <p><strong>Vehicle:</strong> ${vehicleName}</p>
            <p><strong>Vehicle ID:</strong> ${vehicleId}</p>
            <hr>
            <p><strong>Customer Details:</strong></p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr>
            <p><small>This inquiry was sent from AutoBazaar vehicle listing.</small></p>
        `;

        // Auto-reply for inquiry
        const inquiryAutoReply = `
            <h2>Thank you for your interest in ${vehicleName}!</h2>
            <p>Dear ${name},</p>
            <p>We have received your inquiry about the vehicle and will connect you with the seller soon.</p>
            <p><strong>Your Inquiry:</strong></p>
            <p>${message}</p>
            <br>
            <p>Our team will contact you within 24 hours with more details.</p>
            <br>
            <p>Best regards,<br>AutoBazaar Team</p>
        `;

        // Send emails
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
                const transporter = createTransporter();

                // Send to admin
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: process.env.EMAIL_USER,
                    subject: `Vehicle Inquiry - ${vehicleName}`,
                    html: inquiryContent
                });

                // Send auto-reply to customer
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: `Your inquiry about ${vehicleName} - AutoBazaar`,
                    html: inquiryAutoReply
                });

                console.log('Inquiry emails sent successfully');
            } catch (emailError) {
                console.error('Email sending error:', emailError);
            }
        }

        res.json({
            success: true,
            message: 'Your inquiry has been sent successfully! We will contact you soon.'
        });
    } catch (error) {
        console.error('Vehicle inquiry error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while processing inquiry'
        });
    }
});

module.exports = router;