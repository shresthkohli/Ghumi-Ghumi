import pool from "../config/db.js";

function mapUser(row) {

    if (!row) {
        return null;
    }

    return {
        id: row.id,
        name: row.name,
        email: row.email,
        avatarUrl: row.avatar_url,
        bio: row.bio,
        passwordHash: row.password_hash,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };

}

async function findByIdRepository(id) {

    const result = await pool.query(
        `
        SELECT
            id,
            name,
            email,
            created_at,
            updated_at
        FROM users
        WHERE id = $1
        `,
        [id]
    );

    return mapUser(result.rows[0]);

}

async function getProfileUserRepository(userId) {

    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE id = $1;
        `,
        [userId]
    );

    return mapUser(result.rows[0]);

}

async function getUserStatsRepository(userId) {

    const result = await pool.query(
        `
        SELECT

            (
                SELECT COUNT(*)
                FROM favorite_destinations
                WHERE user_id = $1
            ) AS favorite_count,

            (
                SELECT COUNT(*)
                FROM visited_destinations
                WHERE user_id = $1
            ) AS visited_count,

            (
                SELECT COUNT(*)
                FROM reviews
                WHERE user_id = $1
            ) AS review_count,

            (
                SELECT COUNT(*)
                FROM itineraries
                WHERE user_id = $1
            ) AS itinerary_count,

            (
                SELECT COUNT(DISTINCT destinations.city)
                FROM visited_destinations

                INNER JOIN destinations
                ON destinations.id =
                visited_destinations.destination_id

                WHERE visited_destinations.user_id = $1
            ) AS cities_visited,

            (
                SELECT COUNT(DISTINCT destinations.state)
                FROM visited_destinations

                INNER JOIN destinations
                ON destinations.id =
                visited_destinations.destination_id

                WHERE visited_destinations.user_id = $1
            ) AS states_visited;
        `,
        [userId]
    );

    return {

        favoriteCount:
            Number(result.rows[0].favorite_count),

        visitedCount:
            Number(result.rows[0].visited_count),

        reviewCount:
            Number(result.rows[0].review_count),

        itineraryCount:
            Number(result.rows[0].itinerary_count),

        citiesVisited:
            Number(result.rows[0].cities_visited),

        statesVisited:
            Number(result.rows[0].states_visited)

    };

}

export default {
    findByIdRepository,
    getProfileUserRepository,
    getUserStatsRepository
};