import userServices from "../services/userServices.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { COOKIE_OPTIONS } from "../config/auth.js";


const meController = asyncHandler(

    async function (req, res) {

        const user =
            await userServices.meService(
                req.user.id
            );

        return res
            .status(200)
            .json(
                ApiResponse.success(
                    "User fetched successfully.",
                    user
                )
            );

    }

);

function testController(req, res) {
    const data = userServices.testService();

    res.json({
        success: data.success,
        message: data.message
    });
}

const logoutController = asyncHandler(
    async function (req, res) {

        res.clearCookie("token", COOKIE_OPTIONS);

        return res
            .status(200)
            .json(
                ApiResponse.success(
                    "Logged out successfully."
                )
            );

    }
);

export default {
    testController,
    meController,
    logoutController
};