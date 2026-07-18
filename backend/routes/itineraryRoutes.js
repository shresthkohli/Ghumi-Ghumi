import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import validateRequest from "../middlewares/validateRequest.js";
import itineraryValidators from "../validators/itineraryValidators.js";
import itineraryControllers from "../controllers/itineraryControllers.js"
import activityControllers from "../controllers/activityControllers.js";
import activityValidators from "../validators/activityValidators.js";


const router = express.Router();

router.use(authMiddleware);

router.post(
    "/",
    itineraryValidators.createItineraryValidation,
    validateRequest,
    itineraryControllers.createItineraryController
);

router.get(
    "/",
    itineraryControllers.getAllItinerariesController
);

router.get(
    "/:id",
    itineraryControllers.getItineraryByIdController
);

router.patch(
    "/:id",
    itineraryValidators.updateItineraryValidation,
    validateRequest,
    itineraryControllers.updateItineraryController
);

router.delete(
    "/:id",
    itineraryControllers.deleteItineraryController
);


// ACTIVITIES SECTION

router.post(
    "/:id/activities",
    activityValidators.createActivityValidation,
    validateRequest,
    activityControllers.createActivityController
);

router.patch(
    "/activities/:id",
    activityValidators.updateActivityValidation,
    validateRequest,
    activityControllers.updateActivityController
);


export default router;