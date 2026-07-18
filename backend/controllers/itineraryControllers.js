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

const getAllItinerariesController = asyncHandler(

    async function (req, res) {

        const itineraries =
            await itineraryServices
                .getAllItinerariesService(req.user.id);

        return res
            .status(200)
            .json(
                ApiResponse.success(
                    "Itineraries fetched successfully.",
                    itineraries
                )
            );

    }

);

const getItineraryByIdController = asyncHandler(

    async function (req, res) {
        const itinerary =
            await itineraryServices.getItineraryByIdService(
                req.user.id,
                req.params.id
            );

        return res
            .status(200)
            .json(
                ApiResponse.success(
                    "Itinerary fetched successfully.",
                    itinerary
                )
            );
    }
);

const updateItineraryController = asyncHandler(
    async function (req, res) {
        const itinerary =
            await itineraryServices
                .updateItineraryService(
                    req.user.id,
                    req.params.id,
                    req.body
                );

        return res
            .status(200)
            .json(
                ApiResponse.success(
                    "Itinerary updated successfully.",
                    itinerary
                )
            );
    }
);

const deleteItineraryController = asyncHandler(

    async function(req, res) {

        await itineraryServices
            .deleteItineraryService(
                req.user.id,
                req.params.id
            );

        return res
            .status(200)
            .json(
                ApiResponse.success(
                    "Itinerary deleted successfully."
                )
            );
    }
);


export default {
    createItineraryController,
    getAllItinerariesController,
    getItineraryByIdController,
    updateItineraryController,
    deleteItineraryController
};