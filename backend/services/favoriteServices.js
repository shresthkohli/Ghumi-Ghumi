import destinationRepositories from "../repositories/destinationRepositories.js";
import favoriteRepositories from "../repositories/favoriteRepositories.js";
import AppError from "../errors/AppError.js";

async function addFavoriteService(
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
        await favoriteRepositories
            .addFavoriteRepository(
                userId,
                destinationId
            );
    }

    catch (error) {
        if (error.code === "23505") {
            throw new AppError(
                "Destination is already in favorites.",
                409,
                "ALREADY_FAVORITED"
            );
        }
        throw error;
    }
}

async function removeFavoriteService(
    userId,
    destinationId
) {

    await favoriteRepositories
        .removeFavoriteRepository(
            userId,
            destinationId
        );

}

async function getFavoritesService(
    userId
) {

    return await favoriteRepositories
        .getFavoritesRepository(
            userId
        );

}


export default {
    addFavoriteService,
    removeFavoriteService,
    getFavoritesService
}