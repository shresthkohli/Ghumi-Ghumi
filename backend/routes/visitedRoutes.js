import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import visitedControllers from "../controllers/visitedControllers.js";

const router = express.Router();

router.get(
    "/",
    authMiddleware.requireLogin,
    visitedControllers.getVisitedController
);

router.post(
    "/:destinationId",
    authMiddleware.requireLogin,
    visitedControllers.addVisitedController
);

router.delete(
    "/:destinationId",
    authMiddleware.requireLogin,
    visitedControllers.removeVisitedController
);

export default router;