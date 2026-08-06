import apiFetch from "./apiClient";

async function getAllVisitedDestinations(credentials) {

    const response = await apiFetch(
        "/api/visited",
    );

    if (response.success) {
        return response.data;
    }
    else {
        console.error(response.error);
    }
}

async function addVisited(credentials) {

    return await apiFetch(
        `/api/visited/${credentials.id}`,
        {
            method: "POST"
        }
    );
}

async function deleteVisited(credentials) {

    return await apiFetch(
        `/api/visited/${credentials.id}`,
        {
            method: "DELETE"
        }
    );
}


export default {
    getAllVisitedDestinations,
    addVisited,
    deleteVisited
};
