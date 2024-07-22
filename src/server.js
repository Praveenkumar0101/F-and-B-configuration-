const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Unstoppable@22',
  database: 'API',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Registration Route
app.post('/api/register', (req, res) => {
  const { fullName, mobileNumber, username, email, password } = req.body;

  const sql = 'INSERT INTO users (fullName, mobileNumber, username, email, password) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [fullName, mobileNumber, username, email, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving data');
      return;
    }
    console.log('Data inserted:', result);
    res.status(200).send('Registration successful');
  });
});

// Login Route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error logging in');
      return;
    }
    if (result.length > 0) {
      const userId = result[0].id;
      const loginTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const logQuery = 'INSERT INTO user_logs (userId, action, timestamp) VALUES (?, ?, ?)';

      db.query(logQuery, [userId, 'login', loginTime], (logErr) => {
        if (logErr) {
          console.error('Error logging login time:', logErr);
          res.status(500).send('Error logging login time');
          return;
        }
        res.status(200).send('Login successful');
      });
    } else {
      res.status(400).send('Invalid email or password');
    }
  });
});

// Logout Route
app.post('/api/logout', (req, res) => {
  const { userId } = req.body;
  const logoutTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const logQuery = 'INSERT INTO user_logs (userId, action, timestamp) VALUES (?, ?, ?)';

  db.query(logQuery, [userId, 'logout', logoutTime], (logErr) => {
    if (logErr) {
      console.error('Error logging logout time:', logErr);
      res.status(500).send('Error logging logout time');
      return;
    }
    res.status(200).send('Logout successful');
  });
});

// Get all users endpoint
app.get('/api/users', (req, res) => {
  const sql = `
    SELECT users.*, 
           MAX(CASE WHEN action = 'login' THEN timestamp END) AS lastLoginTime,
           MAX(CASE WHEN action = 'logout' THEN timestamp END) AS lastLogoutTime
    FROM users
    LEFT JOIN user_logs ON users.id = user_logs.userId
    GROUP BY users.id`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Error fetching users');
      return;
    }
    res.status(200).json(results);
  });
});

// Get user by ID endpoint
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT * FROM users WHERE id = ?';

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).send('Error fetching user');
      return;
    }
    res.status(200).json(result);
  });
});

// Update user endpoint
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const { fullName, mobileNumber, username, email } = req.body;
  const sql = 'UPDATE users SET fullName = ?, mobileNumber = ?, username = ?, email = ? WHERE id = ?';

  db.query(sql, [fullName, mobileNumber, username, email, userId], (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).send('Error updating user');
      return;
    }
    res.status(200).send('User updated successfully');
  });
});

// Delete user endpoint
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'DELETE FROM users WHERE id = ?';

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).send('Error deleting user');
      return;
    }
    res.status(200).send('User deleted successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
