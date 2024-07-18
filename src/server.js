// const express = require('express');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const port = 5000;

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors()); // Enable CORS

// // MySQL Connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Unstoppable@22',
//   database: 'API',
// });

// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('Connected to MySQL database');
// });

// // Registration Route
// app.post('/api/register', (req, res) => {
//   const { fullName, mobileNumber, username, email, password } = req.body;

//   const sql = 'INSERT INTO users (fullName, mobileNumber, username, email, password) VALUES (?, ?, ?, ?, ?)';
//   db.query(sql, [fullName, mobileNumber, username, email, password], (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error saving data');
//       return;
//     }
//     console.log('Data inserted:', result);
//     res.status(200).send('Registration successful');
//   });
// });

// // Login Route
// app.post('/api/login', (req, res) => {
//   const { email, password } = req.body;

//   const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
//   db.query(sql, [email, password], (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error logging in');
//       return;
//     }
//     if (result.length > 0) {
//       res.status(200).send('Login successful');
//     } else {
//       res.status(400).send('Invalid email or password');
//     }
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });



const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Unstoppable@22',
  database: 'API',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to database');
});

// Register endpoint
app.post('/api/register', (req, res) => {
  const { fullName, mobileNumber, username, email, password } = req.body;
  const query = 'INSERT INTO users (fullName, mobileNumber, username, email, password) VALUES (?, ?, ?, ?, ?)';

  db.query(query, [fullName, mobileNumber, username, email, password], (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).send('Error registering user');
      return;
    }
    res.status(200).send('User registered successfully');
  });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';

  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.error('Error logging in:', err);
      res.status(500).send('Error logging in');
      return;
    }

    if (result.length > 0) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

// Get all users endpoint
app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM users';

  db.query(query, (err, results) => {
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
  const query = 'SELECT * FROM users WHERE id = ?';

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).send('Error fetching user');
      return;
    }
    res.status(200).json(result);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
