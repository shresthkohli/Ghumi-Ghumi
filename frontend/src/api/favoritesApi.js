import apiFetch from "./apiClient";

async function getAllFavDestinations(credentials) {

    const response = await apiFetch(
        "/api/favorites",
    );

    if (response.success) {
        return response.data;
    }
    else {
        console.error(response.error);
    }
}

async function addFavorite(credentials) {

    return apiFetch(
        `/api/favorites/${credentials.destinationId}`,
        {
            method: "POST"
        }
    );
}

export default {
    getAllFavDestinations,
    addFavorite
};
