import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fs from "fs";
import cors from "cors";

import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

//accepting cross site cookies
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

//Built-in middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

//Basic GET request
app.get("/", (req, res) => {
    res.sendFile("Home.html", { root: "public" });
});

//Global error handeling
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});