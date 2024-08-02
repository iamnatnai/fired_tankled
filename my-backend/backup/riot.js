const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const app = express();
const port = 5000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'fireduploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/fireduploads', express.static(path.join(__dirname, 'fireduploads')));
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = 'kasenradforreal'; // Change this to a strong secret key

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const query = 'SELECT * FROM users WHERE username = ?';
  connection.query(query, [username], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error querying database' });

    if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) return res.status(500).json({ error: 'Error comparing passwords' });

      if (!result) return res.status(401).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
      res.json({ token });
    });
  });
});
// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fired_data'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Route to get data based on the result
app.get('/api/data/:result', (req, res) => {
  const { result } = req.params;
  console.log('Received result for query:', result);

  const query = 'SELECT * FROM fire_extinguisher WHERE FCODE = ?';
  connection.query(query, [result], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Error retrieving data' });
    }
    if (results.length === 0) {
      console.log('No data found for result:', result);
      return res.status(404).json({ error: 'No data found' });
    }
    console.log('Data retrieved:', results);
    res.json(results);
  });
});

app.get('/api/fire-extinguishers', (req, res) => {
  const query = 'SELECT * FROM fire_extinguisher';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Error retrieving data' });
    }
    console.log('Data retrieved:', results);
    res.json(results);
  });
});

app.get('/api/search', (req, res) => {
  const searchTerm = req.query.q; // รับคำค้นหาจาก query string
  if (!searchTerm) {
    return res.status(400).json({ error: 'Search term is required' });
  }

  // ปรับปรุง query เพื่อค้นหาข้อมูลตามคำค้นหา
  const query = 'SELECT * FROM fire_extinguisher WHERE FCODE LIKE ? OR F_located LIKE ?';
  const searchQuery = `%${searchTerm}%`;

  connection.query(query, [searchQuery, searchQuery], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Error retrieving data' });
    }
    console.log('Data retrieved:', results);
    res.json(results);
  });
});

// Route to handle image upload
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { originalname, filename, path: filePath } = req.file;
  const imageUrl = `/fireduploads/${filename}`;

  // Save image details to the database if needed
  // Example: const query = 'INSERT INTO fire_extinguisher_images (filename, url) VALUES (?, ?)';
  // connection.query(query, [originalname, imageUrl], (err, result) => { ... });

  res.json({ message: 'File uploaded successfully', file: req.file });
});








app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
