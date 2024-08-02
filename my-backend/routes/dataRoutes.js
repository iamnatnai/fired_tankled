const express = require('express');
const router = express.Router();
const connection = require('../db'); // Update this path as needed

router.get('/data/:result', (req, res) => {
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

router.get('/fire-extinguishers', (req, res) => {
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

router.get('/search', (req, res) => {
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

module.exports = router;
