import itineraryServices from "../services/itineraryServices.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createItineraryController = asyncHandler(
    async function (req, res) {
        const itinerary =
            await itineraryServices.createItineraryService(
                req.user.id,
                req.body
            );

        return res
            .status(201)
            .json(
                ApiResponse.success(
                    "Itinerary created successfully.",
                    itinerary
                )

            );
    }
);

export default {
    createItineraryController
};