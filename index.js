import express from "express";
import dotenv from "dotenv";
import chatRoute from "./routes/chatRoute.js";
import cors from "cors";

const app = express();
dotenv.config();
// FIXED CORS - THIS IS THE ONLY CORRECT WAY
app.use(cors({
  origin: "https://riya-my-bot.netlify.app", 
  // credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"], 
}));

// This is CRITICAL - add this middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());
app.use("/api", chatRoute);

app.get("/", (req, res) => {
  res.send("server is running");
});


app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on port: ${process.env.PORT}`);
});