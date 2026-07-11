import express from "express";

import destinationControllers from "../controllers/destinationControllers.js";

const router = express.Router();

router.get(
    "/",
    destinationControllers.getAllDestinationsController
);

export default router;