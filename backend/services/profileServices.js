import userRepositories from "../repositories/userRepositories.js";
import destinationRepositories from "../repositories/destinationRepositories.js";
import itineraryRepositories from "../repositories/itineraryRepositories.js";


const BADGES = [

    {
        min: 0,
        name: "Rookie Traveler",
        icon: "explore",
        description:
            "Every great journey starts with the first step."
    },

    {
        min: 5,
        name: "Explorer",
        icon: "travel_explore",
        description:
            "You're discovering the incredible diversity of India."
    },

    {
        min: 15,
        name: "Trailblazer",
        icon: "hiking",
        description:
            "You've ventured far beyond the ordinary."
    },

    {
        min: 30,
        name: "Voyager",
        icon: "public",
        description:
            "A seasoned traveler with stories from every corner."
    },

    {
        min: 50,
        name: "Voyager Zenith",
        icon: "military_tech",
        description:
            "You've reached the highest tier of Indian exploration."
    }

];

const PASSPORT_EXPIRATIONS = [

    "UNTIL THE NEXT ADVENTURE",

    "PERPETUAL",

    "VALID WHILE CURIOSITY EXISTS",

    "UNTIL THE MAP ENDS",

    "NO EXPIRY. KEEP WANDERING.",

    "VALID UNTIL THE LAST SUNSET"

];

function getBadge(visitedCount) {

    let currentBadge = BADGES[0];

    for (const badge of BADGES) {

        if (visitedCount >= badge.min) {
            currentBadge = badge;
        }

    }

    return currentBadge;

}

function generatePassportNumber(userId) {

    return `WNDR-${userId
        .replaceAll("-", "")
        .slice(-8)
        .toUpperCase()}`;

}

function getExpirationText() {

    const index =
        Math.floor(
            Math.random() *
            PASSPORT_EXPIRATIONS.length
        );

    return PASSPORT_EXPIRATIONS[index];

}

async function getProfileService(userId) {

    const [
        user,
        stats,
        passportStamps,
        featuredJourneys
    ] = await Promise.all([

        userRepositories.getProfileUserRepository(userId),

        userRepositories.getUserStatsRepository(userId),

        destinationRepositories.getPassportStampsRepository(userId),

        itineraryRepositories.getFeaturedItinerariesRepository(userId)

    ]);

    return {

        user,

        stats,

        badge:
            getBadge(
                stats.visitedCount
            ),

        passport: {

            passportNumber:
                generatePassportNumber(
                    user.id
                ),

            memberSince:
                user.createdAt,

            expirationDate:
                getExpirationText(),

            stamps:
                passportStamps

        },

        featuredJourneys

    };

}


export default {
    getProfileService
};