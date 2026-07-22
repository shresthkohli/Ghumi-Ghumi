import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import visitedServices from "../services/visitedServices.js";

const addVisitedController = asyncHandler(

    async function (req, res) {

        await visitedServices
            .addVisitedService(
                req.user.id,
                req.params.destinationId
            );

        return res
            .status(201)
            .json(
                ApiResponse.success(
                    "Destination marked as visited."
                )
            );
    }
);

const removeVisitedController = asyncHandler(

    async function (req, res) {

        await visitedServices
            .removeVisitedService(
                req.user.id,
                req.params.destinationId
            );

        return res
            .json(
                ApiResponse.success(
                    "Destination removed from visited."
                )
            );
    }
);

const getVisitedController = asyncHandler(

    async function (req, res) {

        const visited =
            await visitedServices
                .getVisitedService(
                    req.user.id
                );

        return res
            .json(
                ApiResponse.success(
                    null,
                    visited
                )
            );
    }
);

export default {
    addVisitedController,
    removeVisitedController,
    getVisitedController
};