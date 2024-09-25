const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// Create a new task
exports.createTodo = async (req, res) => {
    const { title, status } = req.body;
    const userId = req.user.id;  // Extracted from JWT

    try {
        const taskId = uuidv4();
        const newTodo = { id: taskId, title, status, userId };
        await db.createTodo(newTodo);

        res.status(201).json({ message: 'Task created successfully!', newTodo });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all tasks for the authenticated user
exports.getTodos = async (req, res) => {
    const userId = req.user.id;

    try {
        const todos = await db.getTodosByUserId(userId);
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a task by ID
exports.updateTodo = async (req, res) => {
    const { title, status } = req.body;
    const todoId = req.params.id;

    try {
        await db.updateTodo(todoId, { title, status });
        res.json({ message: 'Task updated successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a task by ID
exports.deleteTodo = async (req, res) => {
    const todoId = req.params.id;

    try {
        await db.deleteTodo(todoId);
        res.json({ message: 'Task deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
