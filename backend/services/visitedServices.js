import destinationRepositories from "../repositories/destinationRepositories.js";
import visitedRepositories from "../repositories/visitedRepositories.js";
import AppError from "../errors/AppError.js";

async function addVisitedService(
    userId,
    destinationId
) {

    const destination =
        await destinationRepositories
            .getDestinationByIdRepository(
                destinationId
            );

    if (!destination) {
        throw new AppError(
            "Destination not found.",
            404,
            "DESTINATION_NOT_FOUND"
        );
    }

    try {
        await visitedRepositories
            .addVisitedRepository(
                userId,
                destinationId
            );
    }

    catch (error) {
        if (error.code === "23505") {
            throw new AppError(
                "Destination is already marked as visited.",
                409,
                "ALREADY_VISITED"
            );
        }

        throw error;
    }
}

async function removeVisitedService(
    userId,
    destinationId
) {

    await visitedRepositories
        .removeVisitedRepository(
            userId,
            destinationId
        );

}

async function getVisitedService(
    userId
) {

    return await visitedRepositories
        .getVisitedRepository(
            userId
        );

}


export default {
    addVisitedService,
    removeVisitedService,
    getVisitedService
};