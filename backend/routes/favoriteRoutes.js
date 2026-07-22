import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import favoriteControllers from "../controllers/favoriteControllers.js";

const router = express.Router();


router.get(
    "/",
    authMiddleware.requireLogin,
    favoriteControllers.getFavoritesController
);

router.post(
    "/:destinationId",
    authMiddleware.requireLogin,
    favoriteControllers.addFavoriteController
);

router.delete(
    "/:destinationId",
    authMiddleware.requireLogin,
    favoriteControllers.removeFavoriteController
);


export default router;