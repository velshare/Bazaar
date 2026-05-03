const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { body, validationResult } = require('express-validator');
const { sendWelcomeEmail, sendLoginNotification } = require('../services/emailService');

const router = express.Router();

// Local file fallback (when MongoDB is down)
const DATA_DIR = path.join(__dirname, '../data');
const LOCAL_USERS_FILE = path.join(DATA_DIR, 'users.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

const getLocalUsers = () => {
    try { return JSON.parse(fs.readFileSync(LOCAL_USERS_FILE, 'utf8')); } catch { return []; }
};
const saveLocalUsers = (users) => {
    fs.writeFileSync(LOCAL_USERS_FILE, JSON.stringify(users, null, 2));
};

const generateToken = (id, email, name) => {
    return jwt.sign({ id, email, name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

let User;
try { User = require('../models/User'); } catch { User = null; }

// @route   POST /api/auth/register
router.post('/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('phone').matches(/^[0-9]{10}$/).withMessage('Please provide a valid phone number'),
    body('city').notEmpty().withMessage('City is required'),
    body('address').notEmpty().withMessage('Address is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

        const { name, email, password, phone, city, address, userType } = req.body;
        let userId, token;

        try {
            const existing = await User.findOne({ email });
            if (existing) return res.status(400).json({ success: false, message: 'User already exists with this email' });
            const user = await User.create({ name, email, password, phone, city, address, userType: userType || 'both' });
            token = generateToken(user._id, user.email, user.name);
            userId = user._id;
        } catch {
            // Fallback to local file
            const users = getLocalUsers();
            if (users.find(u => u.email === email)) return res.status(400).json({ success: false, message: 'User already exists with this email' });
            const hashed = await bcrypt.hash(password, 10);
            const newUser = { id: Date.now().toString(), name, email, password: hashed, phone, city, address, userType: userType || 'both' };
            users.push(newUser);
            saveLocalUsers(users);
            token = generateToken(newUser.id, newUser.email, newUser.name);
            userId = newUser.id;
        }

        await sendWelcomeEmail(email, name);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: { id: userId, name, email, phone, city, userType: userType || 'both' }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Server error during registration' });
    }
});

// @route   POST /api/auth/login
router.post('/login', [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

        const { email, password } = req.body;
        let userName, userId, token;

        try {
            const user = await User.findOne({ email }).select('+password');
            if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
            const isMatch = await user.matchPassword(password);
            if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });
            token = generateToken(user._id, user.email, user.name);
            userName = user.name;
            userId = user._id;
        } catch {
            // Fallback to local file
            const users = getLocalUsers();
            const user = users.find(u => u.email === email);
            if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });
            token = generateToken(user.id, user.email, user.name);
            userName = user.name;
            userId = user.id;
        }

        await sendLoginNotification(email, userName);

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: { id: userId, name: userName, email }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
});

// @route   GET /api/auth/me
router.get('/me', async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ success: false, message: 'No token' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ success: true, user: { id: decoded.id, name: decoded.name, email: decoded.email } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
