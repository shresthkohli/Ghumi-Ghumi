import apiFetch from "./apiClient";
const API_URL = import.meta.env.VITE_API_URL ?? "";

async function getAllItineraries(credentials) {

    const response = await apiFetch(
        "/api/itineraries"
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
        "/api/itineraries",
        {
            method: "POST",
            body: JSON.stringify(credentials)
        }
    );
}

async function deleteItinerary(credentials) {
    
    return await apiFetch(
        `/api/itineraries/${credentials.id}`,
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