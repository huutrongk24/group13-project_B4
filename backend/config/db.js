// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const MONGO_URI = 'mongodb://atlas-sql-68e7121a84437f522fb7fe96-oaoray.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin';

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;