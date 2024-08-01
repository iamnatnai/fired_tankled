const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5000;

// ตั้งค่าให้ Express ให้บริการไฟล์จากโฟลเดอร์ uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(bodyParser.json());

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


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
