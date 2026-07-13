import pool from "../config/db.js";

function mapItinerary(row) {

    if (!row) {
        return null;
    }

    return {

        id: row.id,

        userId: row.user_id,

        destinationId: row.destination_id,

        title: row.title,

        description: row.description,

        createdAt: row.created_at,

        updatedAt: row.updated_at

    };

}

function mapActivity(row) {

    if (!row) {
        return null;
    }

    return {

        id: row.id,

        itineraryId: row.itinerary_id,

        dayNumber: row.day_number,

        position: row.position,

        title: row.title,

        description: row.description,

        startTime: row.start_time,

        endTime: row.end_time,

        createdAt: row.created_at,

        updatedAt: row.updated_at

    };

}

async function createItineraryRepository(itineraryData) {

    const result = await pool.query(
        `
        INSERT INTO itineraries (
            user_id,
            destination_id,
            title,
            description
        )
        VALUES (
            $1,
            $2,
            $3,
            $4
        )
        RETURNING*;
        `,
        [
            itineraryData.userId,
            itineraryData.destinationId,
            itineraryData.title,
            itineraryData.description
        ]

    );

    return mapItinerary(result.rows[0]);

}

export default {
    createItineraryRepository
};