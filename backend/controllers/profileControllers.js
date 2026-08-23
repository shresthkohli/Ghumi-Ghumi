import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import profileServices from "../services/profileServices.js";

const getProfileController = asyncHandler(

    async function (req, res) {

        const profile =
            await profileServices
                .getProfileService(
                    req.user.id
                );

        return res.json(
            ApiResponse.success(
                null,
                profile
            )
        );

    }

);

export default {
    getProfileController
};