// backend/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

app.use(cors()); // ⚡ CHO PHÉP FRONTEND TRUY CẬP
app.use(express.json());

connectDB();

// Import route
const userRoutes = require('./routes/user');

// Sử dụng route có tiền tố /api
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));