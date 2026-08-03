import apiFetch from "./apiClient";

async function getAllItineraries(credentials) {

    const response = await apiFetch(
        "api/itineraries"
    )

    if (response.success) {
        return response.data;
    }
    else {
        console.error(response.error);
    }
}

async function createItinerary(credentials) {

    return await apiFetch(
        "api/itineraries",
        {
            method: "POST"
        }
    );
}

async function deleteItinerary(credentials) {
    
    return await apiFetch(
        `api/itineraries/:${credentials.id}`,
        {
            method: "DELETE"
        }
    );
}

export default {
    getAllItineraries,
    createItinerary,
    deleteItinerary
}