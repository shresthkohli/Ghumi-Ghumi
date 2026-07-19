import pool from "../config/db.js";


function mapItinerary(row) {

    if (!row) {
        return null;
    }

    return {
        id: row.id,
        userId: row.user_id,
        destinationId: row.destination_id,
        destinationName: row.destination_name,
        destinationImageUrl: row.image_url,
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

async function getAllItinerariesRepository(userId) {

    const result = await pool.query(
        `
        SELECT
        itineraries.*,
        destinations.name AS destination_name,
        destinations.image_url
        FROM itineraries
        JOIN destinations
        ON itineraries.destination_id = destinations.id
        WHERE itineraries.user_id = $1
        ORDER BY itineraries.created_at DESC;
        `,
        [userId]
    );

    return result.rows.map(mapItinerary);

}

async function getItineraryByIdRepository(itineraryId) {

    const itineraryResult = await pool.query(
        `
        SELECT
            itineraries.*,
            destinations.name AS destination_name,
            destinations.image_url
        FROM itineraries

        JOIN destinations
        ON itineraries.destination_id = destinations.id

        WHERE itineraries.id = $1;
        `,
        [itineraryId]
    );

    const activityResult = await pool.query(
        `
        SELECT *
        FROM activities
        WHERE itinerary_id = $1
        ORDER BY
            day_number ASC,
            position ASC;
        `,
        [itineraryId]
    );

    return {
        ...mapItinerary(itineraryResult.rows[0]),
        activities: activityResult.rows.map(mapActivity)
    };

}

async function updateItineraryRepository(itinerary) {
    const result = await pool.query(
        `
        UPDATE itineraries
        SET
            destination_id = $1,
            title = $2,
            description = $3,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $4

        RETURNING
            itineraries.*,
            (
                SELECT name
                FROM destinations
                WHERE destinations.id = itineraries.destination_id
            ) AS destination_name,
            (
                SELECT image_url
                FROM destinations
                WHERE destinations.id = itineraries.destination_id
            ) AS image_url;
        `,
        [
            itinerary.destinationId,
            itinerary.title,
            itinerary.description,
            itinerary.id
        ]
    );

    return mapItinerary(result.rows[0]);
}

async function deleteItineraryRepository(itineraryId) {

    await pool.query(
        `
        DELETE
        FROM itineraries
        WHERE id = $1;
        `,
        [itineraryId]
    );

}

async function getUserItinerariesForDestinationRepository(
    userId,
    destinationId
) {

    const result = await pool.query(
        `
        SELECT
            id,
            destination_id,
            title,
            description,
            created_at,
            updated_at
        FROM itineraries
        WHERE
            user_id = $1
        AND
            destination_id = $2
        ORDER BY created_at DESC;
        `,
        [
            userId,
            destinationId
        ]
    );

    return result.rows.map(mapItinerary);
}


export default {
    createItineraryRepository,
    getAllItinerariesRepository,
    getItineraryByIdRepository,
    updateItineraryRepository,
    deleteItineraryRepository,
    getUserItinerariesForDestinationRepository
};