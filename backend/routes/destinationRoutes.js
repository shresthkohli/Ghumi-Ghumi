import express from "express";
import reviewValidators from "../validators/reviewValidators.js";
import validateRequest from "../middlewares/validateRequest.js";
import reviewControllers from "../controllers/reviewControllers.js";
import destinationControllers from "../controllers/destinationControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
    "/",
    destinationControllers.getAllDestinationsController
);

router.post(
    "/:id/reviews",
    authMiddleware,
    reviewValidators.createReviewValidation,
    validateRequest,
    reviewControllers.createReviewController
);

export default router;