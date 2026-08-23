import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import favoriteServices from "../services/favoriteServices.js";

const addFavoriteController = asyncHandler(

    async function (req, res) {

        await favoriteServices
            .addFavoriteService(
                req.user.id,
                req.params.destinationId
            );

        return res
            .status(201)
            .json(
                ApiResponse.success(
                    "Destination added to favorites."
                )
            );
    }
);

const removeFavoriteController = asyncHandler(

    async function (req, res) {

        await favoriteServices
            .removeFavoriteService(
                req.user.id,
                req.params.destinationId
            );

        return res
            .json(
                ApiResponse.success(
                    "Destination removed from favorites."
                )
            );
    }
);

const getFavoritesController = asyncHandler(

    async function (req, res) {

        const favorites =
            await favoriteServices
                .getFavoritesService(
                    req.user.id
                );

        return res
            .json(
                ApiResponse.success(
                    null,
                    favorites
                )
            );
    }
);

export default {
    addFavoriteController,
    removeFavoriteController,
    getFavoritesController
};