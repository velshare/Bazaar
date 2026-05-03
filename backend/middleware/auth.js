const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ success: false, message: 'No token, authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Try DB lookup, but fall back to decoded token data if DB is down
        try {
            const user = await User.findById(decoded.id);
            if (user) {
                req.user = user;
            } else {
                req.user = { id: decoded.id, email: decoded.email, name: decoded.name };
            }
        } catch {
            req.user = { id: decoded.id, email: decoded.email, name: decoded.name };
        }

        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Token is not valid' });
    }
};

module.exports = auth;