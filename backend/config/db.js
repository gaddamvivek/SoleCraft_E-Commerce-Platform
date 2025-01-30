// db.js (or any suitable filename for your database connection logic)

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('your_mongodb_connection_string_here', {
      useNewUrlParser: true,  // Deprecated, remove in future versions
      useUnifiedTopology: true, // Deprecated, remove in future versions
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
