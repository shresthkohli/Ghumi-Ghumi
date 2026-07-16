import asyncHandler from "../utils/asyncHandler.js";
import activityServices from "../services/activityServices.js";
import ApiResponse from "../utils/apiResponse.js";


const createActivityController = asyncHandler(
    async function (req, res) {
        const activity =
            await activityServices
                .createActivityService(
                    req.user.id,
                    req.params.id,
                    req.body
                );

        return res
            .status(201)
            .json(
                ApiResponse.success(
                    "Activity created successfully.",
                    activity
                )
            );
    }
);


export default {
    createActivityController
};