import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fs from "fs";

import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
    res.sendFile("Home.html", { root: "public" });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});