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

const updateActivityController = asyncHandler(

    async function (req, res) {
        const activity =
            await activityServices
                .updateActivityService(
                    req.user.id,
                    req.params.id,
                    req.body
                );

        return res
            .status(200)
            .json(
                ApiResponse.success(
                    "Activity updated successfully.",
                    activity
                )
            );
    }
);

const deleteActivityController = asyncHandler(

    async function (req, res) {

        await activityServices
            .deleteActivityService(

                req.user.id,

                req.params.id

            );

        return res
            .status(200)
            .json(

                ApiResponse.success(
                    "Activity deleted successfully.",
                    null
                )

            );

    }

);


export default {
    createActivityController,
    updateActivityController,
    deleteActivityController
};