import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("The database is connected successfully");
  } catch (error) {
    console.log(`Error when connecting database: ${error}`);
  }
};

export default connectDB;
