import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import destinationServices from "../services/destinationServices.js";

const getAllDestinationsController = asyncHandler(

    async function (req, res) {

        const destinations =
            await destinationServices
                .getAllDestinationsService(req.query);

        return res
            .status(200)
            .json(
                ApiResponse.success(
                    "Destinations fetched successfully.",
                    destinations
                )
            );

    }

);

const getDestinationByIdController = asyncHandler(

    async function (req, res) {
        const destination =
            await destinationServices
                .getDestinationByIdService(
                    req.params.id,
                    req.user?.id
                );

        return res
            .status(200)
            .json(
                ApiResponse.success(
                    "Destination fetched successfully.",
                    destination
                )
            );
    }
);

export default {
    getAllDestinationsController,
    getDestinationByIdController
};