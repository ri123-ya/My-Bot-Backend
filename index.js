import express from "express";
import dotenv from "dotenv";
import chatRoute from "./routes/chatRoute.js";
import cors from "cors";

const app = express();
dotenv.config();
// 1. Define the complete CORS options
const corsOptions = {
    origin: process.env.FRONTEND_URL, 
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    // This allows the OPTIONS request to continue to the next middleware/handler
    preflightContinue: true, // <-- CRITICAL CHANGE
    optionsSuccessStatus: 204
};

// Apply the middleware globally
app.use(cors(corsOptions));


app.use(express.json());
app.use("/api", chatRoute);

app.get("/", (req, res) => {
  res.send("server is running");
});


app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on port: ${process.env.PORT}`);
});