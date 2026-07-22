import express from "express";
import reviewValidators from "../validators/reviewValidators.js";
import validateRequest from "../middlewares/validateRequest.js";
import reviewControllers from "../controllers/reviewControllers.js";
import destinationControllers from "../controllers/destinationControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();


router.get(
    "/",
    authMiddleware.optionalLogin,
    destinationControllers.getAllDestinationsController
);

router.post(
    "/:id/reviews",
    authMiddleware.requireLogin,
    reviewValidators.createReviewValidation,
    validateRequest,
    reviewControllers.createReviewController
);

router.get(
    "/:id",
    authMiddleware.optionalLogin,
    destinationControllers.getDestinationByIdController
);


export default router;