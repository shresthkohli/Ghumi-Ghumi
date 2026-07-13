import itineraryRepositories from "../repositories/itineraryRepositories.js";

async function createItineraryService(userId, itineraryData) {
    return await itineraryRepositories.createItineraryRepository({
        userId,
        destinationId: itineraryData.destinationId,
        title: itineraryData.title,
        description: itineraryData.description
    });
}

export default {
    createItineraryService
};