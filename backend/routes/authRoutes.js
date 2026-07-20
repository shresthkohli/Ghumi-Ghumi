import express from "express";
import authControllers from "../controllers/authControllers.js";
import authValidators from "../validators/authValidators.js";
import validateRequest from "../middlewares/validateRequest.js";

const router = express.Router();


router.post(
    "/signup",
    authValidators.signupValidation,
    validateRequest,
    authControllers.signupController
);

router.post(
    "/login",
    authValidators.loginValidation,
    validateRequest,
    authControllers.loginController
);

router.post(
    "/googleLogin",
    authValidators.googleLoginValidation,
    validateRequest,
    authControllers.googleLoginController
);


export default router;