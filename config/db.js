import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);//it assures that until the connection it waits 
        console.log('Database connected successfully');
    }catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};
//mongodb url /database_name