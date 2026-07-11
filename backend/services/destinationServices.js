import destinationRepositories from "../repositories/destinationRepositories.js";

async function getAllDestinationsService() {
    const destinations = await destinationRepositories.getAllDestinationsRepository();

    return destinations;
}

export default {
    getAllDestinationsService
};