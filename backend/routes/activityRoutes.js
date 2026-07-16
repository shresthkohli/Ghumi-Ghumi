import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import validateRequest from "../middlewares/validateRequest.js";
import activityControllers from "../controllers/activityControllers.js";
import activityValidators from "../validators/activityValidators.js";

const router = express.Router();

router.use(authMiddleware);

router.patch(
    "/:id",
    activityValidators.updateActivityValidation,
    validateRequest,
    activityControllers.updateActivityController
);

export default router;