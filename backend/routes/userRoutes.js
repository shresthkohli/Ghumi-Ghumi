import express from "express"
import userControllers from "../controllers/userControllers.js"
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get(
    "/me",
    userControllers.meController
);

router.post(
    "/logout",
    userControllers.logoutController
);

router.get("/test", userControllers.testController);

export default router;