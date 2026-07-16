import itineraryRepositories from "../repositories/itineraryRepositories.js";
import AppError from "../errors/AppError.js";

async function createItineraryService(userId, itineraryData) {
    return await itineraryRepositories.createItineraryRepository({
        userId,
        destinationId: itineraryData.destinationId,
        title: itineraryData.title,
        description: itineraryData.description
    });
}

async function getAllItinerariesService(userId) {

    return await itineraryRepositories
        .getAllItinerariesRepository(userId);

}

async function getItineraryByIdService(userId, itineraryId) {

    const itinerary =
        await itineraryRepositories.getItineraryByIdRepository(itineraryId);

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

    return itinerary;

}

async function updateItineraryService(
    userId,
    itineraryId,
    updates
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

    if (updates.destinationId) {
        const destination =
            await destinationRepositories
                .getDestinationByIdRepository(
                    updates.destinationId
                );

        if (!destination) {
            throw new AppError(
                "Destination not found.",
                404,
                "DESTINATION_NOT_FOUND"
            );
        }

    }

    await itineraryRepositories
        .updateItineraryRepository({

            id: itineraryId,

            destinationId:
                updates.destinationId ??
                itinerary.destinationId,

            title:
                updates.title ??
                itinerary.title,

            description:
                updates.description ??
                itinerary.description

        });

    return await itineraryRepositories.getItineraryByIdRepository(itineraryId);

}

async function deleteItineraryService(
    userId,
    itineraryId
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

    await itineraryRepositories
        .deleteItineraryRepository(itineraryId);

}


export default {
    createItineraryService,
    getAllItinerariesService,
    getItineraryByIdService,
    updateItineraryService,
    deleteItineraryService
};