import destinationRepositories from "../repositories/destinationRepositories.js";

async function getAllDestinationsService(query) {

    return await destinationRepositories
        .getAllDestinationsRepository(query);

}

export default {
    getAllDestinationsService
};