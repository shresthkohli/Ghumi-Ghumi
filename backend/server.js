import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fs from "fs";
import cors from "cors";

import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js"
import itineraryRoutes from "./routes/itineraryRoutes.js";
import activityRoutes from "./routes/activityRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"
import favoriteRoutes from "./routes/favoriteRoutes.js"
import visitedRoutes from "./routes/visitedRoutes.js"
import profileRoutes from "./routes/profileRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

//accepting cross site cookies
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
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
app.use("/api/destinations", destinationRoutes);
app.use("/api/itineraries", itineraryRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/visited", visitedRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/blogs", blogRoutes);

//Basic GET request
app.get("/", (req, res) => {
    res.sendFile("Home.html", { root: "public" });
});

//Global error handeling
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});