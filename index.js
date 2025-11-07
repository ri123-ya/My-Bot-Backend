import express from "express";
import dotenv from "dotenv";
import chatRoute from "./routes/chatRoute.js";
import cors from "cors";

const app = express();
dotenv.config();
// FIXED CORS - THIS IS THE ONLY CORRECT WAY
app.use(cors({
  origin: ["https://celadon-dieffenbachia-f0ea31.netlify.app", "http://localhost:3000"], // your Netlify URL
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"], // THIS LINE WAS MISSING!
}));

// This is CRITICAL - add this middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
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