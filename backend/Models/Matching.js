import mongoose, { Mongoose } from "mongoose";
const matchingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  sleepingTime: {
    type: String,
  },
  smoking: {
    type: String,
    default:"No",
  },
  nightLife: {
    type: String,
  },
  dietaryPreferences: [
    {
      type: String,
      trim: true,
    },
  ],
  hobbies: [
    {
      type: String,
      trim: true,
    },
  ],
  state:{
    type:String,
    trim:true,
  },
  games:[
    {
        type:String,
        trime:true
    }
  ]
});

const Matching = mongoose.model("matching", matchingSchema);
export default Matching;
