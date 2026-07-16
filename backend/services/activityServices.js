import activityRepositories from "../repositories/activityRepositories.js";
import AppError from "../errors/AppError.js";
import itineraryRepositories from "../repositories/itineraryRepositories.js";


async function createActivityService(
    userId,
    itineraryId,
    activity
) {

    const itinerary =
        await itineraryRepositories
            .getItineraryByIdRepository(itineraryId);

    if (!itinerary) {
        throw new AppError(
            "Itinerary not found.",
            404,
            "ITINERARY_NOT_FOUND"
        );
    }

    if (itinerary.userId !== userId) {
        throw new AppError(
            "Itinerary not found.",
            404,
            "ITINERARY_NOT_FOUND"
        );
    }

    if (
        activity.startTime &&
        activity.endTime &&
        activity.endTime <= activity.startTime
    ) {
        throw new AppError(
            "End time must be after start time.",
            400,
            "INVALID_TIME_RANGE"
        );
    }

    try {
        return await activityRepositories
            .createActivityRepository({
                itineraryId,
                ...activity
            });
    } 
    catch (error) {
        if (error.code === "23505") {
            throw new AppError(
                "Another activity already exists at this position.",
                409,
                "POSITION_ALREADY_EXISTS"
            );
        }

        throw error;
    }

}


export default {
    createActivityService
};