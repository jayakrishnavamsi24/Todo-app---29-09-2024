const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, 'secretKey');
        req.user = decoded;  // Add the decoded user ID to the request
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
