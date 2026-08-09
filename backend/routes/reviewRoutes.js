import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js";
import reviewValidators from "../validators/reviewValidators.js";
import validateRequest from "../middlewares/validateRequest.js";
import reviewControllers from "../controllers/reviewControllers.js";

const router = express.Router();

router.use(authMiddleware.requireLogin);

router.post(
    "/:id",
    reviewValidators.createReviewValidation,
    validateRequest,
    reviewControllers.createReviewController
);

router.patch(
    "/:id",
    reviewValidators.updateReviewValidation,
    validateRequest,
    reviewControllers.updateReviewController
);

router.delete(
    "/:id",
    reviewControllers.deleteReviewController
);

export default router;