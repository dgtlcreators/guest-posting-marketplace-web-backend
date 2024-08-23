const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust the path as needed

const authenticateToken = async (req, res, next) => {
    const token = req?.cookies?.token || req?.headers['authorization']?.split(' ')[1]; // Check both cookies and headers

    //if (!token) return res.status(401).json({ message: 'Access token required' });

    try {
        const decoded = jwt.verify(token, 'jwt-secret'); // Use your JWT secret
        const user = await User.findOne({ email: decoded.email }); // Get the user by email

        if (!user) return res.status(401).json({ message: 'User not found' });

        req.user = user; // Attach user to the request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token', error: error.message });
    }
};

module.exports = authenticateToken;
