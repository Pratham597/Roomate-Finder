import express from "express";
import connectDb from "./config/connectDb.js";
import userRoutes from "./Routes/userRoutes.js";
import chatRoutes from "./Routes/chatRoutes.js";
import messageRoutes from './Routes/messageRoutes.js'
import matchingRoutes from "./Routes/matchRoutes.js"
import 'dotenv/config'

const app = express();
const port = 3000;

// Middlewares for parsing the data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/user", userRoutes);
app.use("/matching",matchingRoutes);
app.use("/chat",chatRoutes);
app.use("/message",messageRoutes);

// Error Handling:
app.all('*',(req,res,next)=>{
  return res.status(404).json({message:'Page not found!'});
})

app.use((err,req,res,next)=>{
  console.log(err.message);
  return res.status(500).json({message:"Internal Server Error"});
})

// Port
app.listen(port, () => {
  console.log("App is listening on port successfully :)");
});
