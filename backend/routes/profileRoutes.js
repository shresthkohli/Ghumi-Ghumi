import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import profileControllers from "../controllers/profileControllers.js";

const router = express.Router();

router.get(
    "/",
    authMiddleware.requireLogin,
    profileControllers.getProfileController
);

export default router;