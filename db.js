const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db');

// Create the users table if it doesn't exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`);
});

// Create the todos table if it doesn't exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS todos (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        status TEXT NOT NULL,
        userId TEXT NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id)
    )`);
});

module.exports = {
    // Get user by email
    getUserByEmail: (email) => {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    },

    // Create a new user
    createUser: (user) => {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)',
                [user.id, user.name, user.email, user.password], (err) => {
                    if (err) reject(err);
                    resolve();
                });
        });
    }, 

    // Create a new todo
    createTodo: (todo) => {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO todos (id, title, status, userId) VALUES (?, ?, ?, ?)',
                [todo.id, todo.title, todo.status, todo.userId], (err) => {
                    if (err) reject(err);
                    resolve();
                });
        });
    },

    // Get todos by user ID
    getTodosByUserId: (userId) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM todos WHERE userId = ?', [userId], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    },

    // Update a todo by ID
    updateTodo: (id, updatedTodo) => {
        return new Promise((resolve, reject) => {
            db.run('UPDATE todos SET title = ?, status = ? WHERE id = ?',
                [updatedTodo.title, updatedTodo.status, id], (err) => {
                    if (err) reject(err);
                    resolve();
                });
        });
    },

    // Delete a todo by ID
    deleteTodo: (id) => {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM todos WHERE id = ?', [id], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
};
