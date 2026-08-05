import apiFetch from "./apiClient";


async function getAllDestinations(credentials) {
    const response = await apiFetch(
        "/api/destinations",
    );
    if (response.success) {
        return response.data;
    }
    else {
        console.error(response.error);
    }
}

async function getDestinationsByQuery(queryString) {
    //query string must be "field1=value1&field2=value2"
    //fields are [search, name, city, country, catagory(we have: heritage, adventure, beach, mountains), budget(we have: budget, mid-range, luxury)]
    //queries must be concatenated by '&' and order doesn't matter
    const response = await apiFetch(
        `/api/destinations?${queryString}`
    );
    if (response.success) {
        return response.data;
    }
    else {
        console.error(response.error);
    }
}

async function getDestinationById(DestinationId) {
    const response = await apiFetch(
        `/api/destinations/${DestinationId}`
    );
    if (response.success) {
        return response.data;
    }
    else {
        console.error(response.error);
    }
}

async function getDestinationById(DestinationId) {
    const response = await apiFetch(
        `/api/destinations/${DestinationId}`
    );
    if (response.success) {
        return response.data;
    }
    else {
        console.error(response.error);
    }
}

async function getDestinationById(id) {
    
    const response = await apiFetch(
        `/api/destinations/${id}`
    );
    if (response.success) {
        return response.data;
    }
    else {
        console.error(response.error);
    }
}

export default {
    getAllDestinations,
    getDestinationsByQuery,
    getDestinationById
};
