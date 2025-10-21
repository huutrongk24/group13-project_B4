// // backend/config/db.js
// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const MONGO_URI = 'mongodb+srv://group13:12345@cluster0.gboi7rr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

//     await mongoose.connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log('✅ MongoDB connected successfully');
//   } catch (err) {
//     console.error('❌ MongoDB connection error:', err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const MONGO_URI = 'mongodb+srv://group13:12345@cluster0.gboi7rr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB; 