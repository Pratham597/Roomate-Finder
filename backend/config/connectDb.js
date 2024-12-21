import mongoose from "mongoose";

const connectDb = async () => {
  await mongoose.connect("mongodb://localhost:27017/roomate_finder");
};
// MongoDb connection.
connectDb()
  .then(() => {
    console.log("Database is connected successfully :)");
  })
  .catch((err) => {
    console.log("Error occured in connecting database.");
  });

export default connectDb;
