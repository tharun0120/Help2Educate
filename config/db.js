const mongoose = require("mongoose");
// const Donatoins = require("../models/donations");

// const deletetemp = async () => {
//   await Donatoins.deleteOne({ _id: "61c99f3ceda48cdd9ec2e3d6" });
// };

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (process.env.NODE_ENV === "Development")
      console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
