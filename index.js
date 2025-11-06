import express from "express";
import dotenv from "dotenv";
import chatRoute from "./routes/chatRoute.js";
import cors from "cors";

const app = express();
dotenv.config();
// 1. Define the complete CORS options in one object
const corsOptions = {
    origin: process.env.FRONTEND_URL, 
    credentials: true,
    // CRITICAL: Explicitly list the headers the browser is complaining about
    allowedHeaders: ['Content-Type', 'Authorization'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Removed OPTIONS from here
    optionsSuccessStatus: 204
};

// Apply the middleware globally to all routes (GET, POST, etc.)
app.use(cors(corsOptions));

// 2. CRITICAL FIX: Use the simple wildcard '*' for the OPTIONS handler.
// This handles all incoming preflight requests without crashing.
app.options("*", cors(corsOptions));
app.use(express.json());
app.use("/api", chatRoute);

app.get("/", (req, res) => {
  res.send("server is running");
});


app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on port: ${process.env.PORT}`);
});