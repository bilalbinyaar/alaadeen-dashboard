// db.js

const mongoose = require('mongoose');

const username = 'alaadeen';
const password = 'new-alaadeen';
const clusterName = 'clusteralaadeen';

const uri = `mongodb+srv://${username}:${password}@${clusterName}.4oqg8rv.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas!');
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
