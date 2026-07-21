import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import authServices from "../services/authServices.js";
import { COOKIE_OPTIONS } from "../config/auth.js";

const signupController = asyncHandler(
    async function (req, res) {
        const user = await authServices.signupService(req.body);

        return res
            .status(201)
            .json(
                ApiResponse.success(
                    "User created successfully.",
                    user
                )
            );
    }
);

const loginController = asyncHandler(
    async function (req, res) {
        const { user, token } = await authServices.loginService(req.body);

        res.cookie("token", token, COOKIE_OPTIONS);

        return res
            .status(200)
            .json(
                ApiResponse.success(
                    "Logged in successfully.",
                    {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                )
            );
    }
);

const googleLoginController = asyncHandler(

    async function (req, res) {

        const {
            user,
            token
        } = await authServices
            .googleLoginService(
                req.body.credential
            );

        res.cookie(
            "token",
            token,
            COOKIE_OPTIONS
        );

        return res
            .status(200)
            .json(
                ApiResponse.success(
                    "Logged in successfully.",
                    user
                )
            );
    }
);


export default {
    signupController,
    loginController,
    googleLoginController
};