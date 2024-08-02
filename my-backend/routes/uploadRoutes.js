const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

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

router.post('/upload', upload.single('image'), (req, res) => {
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

module.exports = router;
