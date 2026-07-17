import pool from "../config/db.js";

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

async function createActivityRepository(activity) {

    const result = await pool.query(
        `
        INSERT INTO activities (
            itinerary_id,
            day_number,
            position,
            title,
            description,
            start_time,
            end_time
        )
        VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7
        )
        RETURNING *;
        `,
        [
            activity.itineraryId,
            activity.dayNumber,
            activity.position,
            activity.title,
            activity.description,
            activity.startTime,
            activity.endTime
        ]
    );

    return mapActivity(result.rows[0]);

}

async function getActivityByIdRepository(activityId) {
    const result = await pool.query(
        `
        SELECT *
        FROM activities
        WHERE id = $1;
        `,
        [activityId]
    );

    return mapActivity(result.rows[0]);
}

async function updateActivityRepository(activity) {
    const result = await pool.query(
        `
        UPDATE activities
        SET
            day_number = $1,
            position = $2,
            title = $3,
            description = $4,
            start_time = $5,
            end_time = $6,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $7
        RETURNING *;
        `,
        [
            activity.dayNumber,
            activity.position,
            activity.title,
            activity.description,
            activity.startTime,
            activity.endTime,
            activity.id
        ]
    );

    return mapActivity(result.rows[0]);
}

async function deleteActivityRepository(activityId) {

    await pool.query(
        `
        DELETE
        FROM activities
        WHERE id = $1;
        `,
        [activityId]
    );

}


export default {
    createActivityRepository,
    getActivityByIdRepository,
    updateActivityRepository,
    deleteActivityRepository
};