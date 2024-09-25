const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const cors = require('cors');

app.use(express.json());

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3001', // Your frontend URL
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Simple route for testing
app.get('/', (req, res) => {
    res.send('Hello, this is the Todo API!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
