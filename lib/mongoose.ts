import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("Not connected to Mongo");
  if (isConnected) return console.log("connected to Mongo");

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
};
