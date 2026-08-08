import destinationRepositories from "../repositories/destinationRepositories.js";
import reviewRepositories from "../repositories/reviewRepositories.js";
import itineraryRepositories from "../repositories/itineraryRepositories.js";
import attractionRepositories from "../repositories/attractionRepositories.js";

async function getAllDestinationsService(query, userId) {

    return await destinationRepositories
        .getAllDestinationsRepository(query, userId);

}

async function getDestinationByIdService(
    destinationId,
    userId
) {

    const [
        destination,
        reviews,
        attractions
    ] = await Promise.all([

        destinationRepositories
            .getDestinationByIdRepository(
                destinationId,
                userId
            ),

        reviewRepositories
            .getReviewsForDestinationRepository(
                destinationId
            ),

        attractionRepositories
            .getAttractionsRepository(
                destinationId
            )

    ]);

    if (!destination) {
        throw new AppError(
            "Destination not found.",
            404,
            "DESTINATION_NOT_FOUND"
        );
    }

    if (userId) {

        for (const review of reviews) {
            review.isOwner =
                review.userId === userId;
        }

        reviews.sort(
            (a, b) =>
                Number(b.isOwner) -
                Number(a.isOwner)
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

    destination.attractions = attractions;

    return destination;

}


export default {
    getAllDestinationsService,
    getDestinationByIdService
};