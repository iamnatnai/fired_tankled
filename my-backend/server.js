const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 2222;

// Import routes
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Serve static files from the uploads folder
app.use('/fireduploads', express.static(path.join(__dirname, 'fireduploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api', dataRoutes);
app.use('/api', uploadRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
