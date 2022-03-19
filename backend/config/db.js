const { default : mongoose } = require('mongoose');
const colors = require("colors");

const connectDB = async () => {
  // to connect to the database to server
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
    process.exit();
  }
};

module.exports = connectDB;