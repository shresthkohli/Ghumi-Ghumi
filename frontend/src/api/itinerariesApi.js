import apiFetch from "./apiClient";

function unwrap(response) {
    if (response.success) {
        return response.data;
    }
    throw new Error(response.message || "Something went wrong. Please try again.");
}

const itinerariesApi = {
    async getAllItineraries() {
        const response = await apiFetch("/api/itineraries");
        return unwrap(response);
    },

    async getItineraryById(id) {
        const response = await apiFetch(`/api/itineraries/${id}`);
        return unwrap(response);
    },

    async createItinerary(itineraryData) {
        const response = await apiFetch("/api/itineraries", {
            method: "POST",
            body: JSON.stringify(itineraryData),
        });
        return unwrap(response);
    },

    async updateItinerary(id, updates) {
        const response = await apiFetch(`/api/itineraries/${id}`, {
            method: "PATCH",
            body: JSON.stringify(updates),
        });
        return unwrap(response);
    },

    async deleteItinerary(id) {
        const response = await apiFetch(`/api/itineraries/${id}`, { method: "DELETE" });
        unwrap(response);
    },

    async createActivity(itineraryId, activityData) {
        const response = await apiFetch(`/api/itineraries/${itineraryId}/activities`, {
            method: "POST",
            body: JSON.stringify(activityData),
        });
        return unwrap(response);
    },

    async updateActivity(activityId, updates) {
        const response = await apiFetch(`/api/activities/${activityId}`, {
            method: "PATCH",
            body: JSON.stringify(updates),
        });
        return unwrap(response);
    },

    async deleteActivity(activityId) {
        const response = await apiFetch(`/api/activities/${activityId}`, { method: "DELETE" });
        unwrap(response);
    },
};

export default itinerariesApi;