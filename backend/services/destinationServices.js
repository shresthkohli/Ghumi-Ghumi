import destinationRepositories from "../repositories/destinationRepositories.js";
import reviewRepositories from "../repositories/reviewRepositories.js";
import itineraryRepositories from "../repositories/itineraryRepositories.js";

async function getAllDestinationsService(query) {

    return await destinationRepositories
        .getAllDestinationsRepository(query);

}

async function getDestinationByIdService(
    destinationId,
    userId
) {

    const destination =
        await destinationRepositories
            .getDestinationByIdRepository(destinationId);

    if (!destination) {
        throw new AppError(
            "Destination not found.",
            404,
            "DESTINATION_NOT_FOUND"
        );
    }

    const reviews =
        await reviewRepositories
            .getReviewsForDestinationRepository(
                destinationId
            );

    if (userId) {

        for (const review of reviews) {
            review.isOwner =
                review.userId === userId;
        }

        reviews.sort(
            (a, b) =>
                Number(b.isOwner) - Number(a.isOwner)
        );

        destination.itineraries =
            await itineraryRepositories
                .getUserItinerariesForDestinationRepository(
                    userId,
                    destinationId
                );
    }

    else {
        for (const review of reviews) {
            review.isOwner = false;
        }

        destination.itineraries = [];
    }

    destination.reviews = reviews;

    return destination;
}


export default {
    getAllDestinationsService,
    getDestinationByIdService
};