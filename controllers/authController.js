const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

// User signup
exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const userExists = await db.getUserByEmail(email);
        if (userExists) return res.status(400).json({ message: 'User already exists!' });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const userId = uuidv4();
        const newUser = { id: userId, name, email, password: hashedPassword };
        await db.createUser(newUser);

        // Generate JWT
        const token = jwt.sign({ id: userId }, 'secretKey', { expiresIn: '1h' });

        res.status(201).json({ token, message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await db.getUserByEmail(email);
        if (!user) return res.status(400).json({ message: 'User not found!' });

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials!' });

        // Generate JWT
        const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '1h' });

        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
