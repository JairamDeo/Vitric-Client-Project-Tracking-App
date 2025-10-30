// /dbjs
const mongoose = require('mongoose');
require('dotenv').config();

/* connection queries */
const MONGODB_URI = process.env.MONGODB_URI;
/* connection queries */

const mongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB Connected");

  } catch (err) {
    console.error("---", err);
  }
};

module.exports = mongoDB;