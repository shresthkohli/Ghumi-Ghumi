import pool from "../config/db.js";

function mapDestination(row) {
    if (!row) {
        return null;
    }

    return {
        id: row.id,
        name: row.name,
        city: row.city,
        state: row.state,
        country: row.country,
        description: row.description,
        imageUrl: row.image_url,
        category: row.category,
        bestTimeToVisit: row.best_time_to_visit,
        weather: row.weather,
        entryRequirements: row.entry_requirements,
        averageRating: Number(row.average_rating),
        budgetCategory: row.budget_category,
        isFavorite: row.is_favorite ?? false,
        isVisited: row.is_visited ?? false,
        icon: row.icon,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}

async function getAllDestinationsRepository(query, userId = null) {

    let sql = `
        SELECT
            destinations.*,

            EXISTS(
                SELECT 1
                FROM favorite_destinations
                WHERE
                    favorite_destinations.user_id = $1
                    AND destination_id = destinations.id
            ) AS is_favorite,

            EXISTS(
                SELECT 1
                FROM visited_destinations
                WHERE
                    visited_destinations.user_id = $1
                    AND destination_id = destinations.id
            ) AS is_visited

        FROM destinations
    `;

    const conditions = [];

    const values = [userId];

    if (query.search) {

        const placeholder = `$${values.length + 1}`;

        conditions.push(`
            (
                LOWER(name) LIKE LOWER(${placeholder})
                OR LOWER(city) LIKE LOWER(${placeholder})
                OR LOWER(state) LIKE LOWER(${placeholder})
                OR LOWER(country) LIKE LOWER(${placeholder})
                OR LOWER(category) LIKE LOWER(${placeholder})
            )
        `);

        values.push(`%${query.search}%`);

    }

    if (query.name) {

        conditions.push(
            `LOWER(name) = LOWER($${values.length + 1})`
        );

        values.push(query.name);

    }

    if (query.city) {

        conditions.push(
            `LOWER(city) = LOWER($${values.length + 1})`
        );

        values.push(query.city);

    }

    if (query.state) {

        conditions.push(
            `LOWER(state) = LOWER($${values.length + 1})`
        );

        values.push(query.state);

    }

    if (query.country) {

        conditions.push(
            `LOWER(country) = LOWER($${values.length + 1})`
        );

        values.push(query.country);

    }

    if (query.category) {

        conditions.push(
            `LOWER(category) = LOWER($${values.length + 1})`
        );

        values.push(query.category);

    }

    if (query.budget) {

        conditions.push(
            `LOWER(budget_category) = LOWER($${values.length + 1})`
        );

        values.push(query.budget);

    }

    if (query.weather) {

        conditions.push(
            `LOWER(weather) LIKE LOWER($${values.length + 1})`
        );

        values.push(`%${query.weather}%`);

    }

    if (conditions.length > 0) {

        sql += `
            WHERE
            ${conditions.join("\nAND\n")}
        `;

    }

    sql += `
        ORDER BY average_rating DESC;
    `;

    const result = await pool.query(
        sql,
        values
    );

    return result.rows.map(mapDestination);

}

async function getDestinationByIdRepository(
    destinationId,
    userId = null
) {

    const result = await pool.query(
        `
        SELECT
            destinations.*,

            EXISTS(
                SELECT 1
                FROM favorite_destinations
                WHERE
                    favorite_destinations.user_id = $2
                    AND favorite_destinations.destination_id = destinations.id
            ) AS is_favorite,

            EXISTS(
                SELECT 1
                FROM visited_destinations
                WHERE
                    visited_destinations.user_id = $2
                    AND visited_destinations.destination_id = destinations.id
            ) AS is_visited

        FROM destinations

        WHERE
            destinations.id = $1;
        `,
        [
            destinationId,
            userId
        ]
    );

    return mapDestination(result.rows[0]);

}

async function getPassportStampsRepository(userId) {

    const result = await pool.query(
        `
        SELECT
            destinations.id,
            destinations.name,
            destinations.state,
            destinations.icon

        FROM visited_destinations

        INNER JOIN destinations
        ON destinations.id =
        visited_destinations.destination_id

        WHERE visited_destinations.user_id = $1

        ORDER BY destinations.name

        LIMIT 6;
        `,
        [userId]
    );

    return result.rows.map((row) => ({
        id: row.id,
        name: row.name,
        icon: row.icon,
        state: row.state
    }));

}


export default {
    mapDestination,
    getAllDestinationsRepository,
    getDestinationByIdRepository,
    getPassportStampsRepository
};