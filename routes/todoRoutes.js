const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected routes (only accessible with a valid JWT)
router.post('/', authMiddleware, todoController.createTodo);
router.get('/', authMiddleware, todoController.getTodos);
router.put('/:id', authMiddleware, todoController.updateTodo);
router.delete('/:id', authMiddleware, todoController.deleteTodo);

module.exports = router;
