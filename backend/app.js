import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./database/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import houseRoutes from "./routes/house.route.js";
import userRoutes from "./routes/user.route.js";
dotenv.config();

const PORT = process.env.PORT || 5500;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/houses", houseRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`The server is running on http://localhost:${PORT}`);
});
