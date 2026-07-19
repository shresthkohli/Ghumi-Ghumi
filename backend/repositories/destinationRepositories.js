import pool from "../config/db.js";

function mapDestination(row) {
    if (!row) {
        return null;
    }

    return {
        id: row.id,
        name: row.name,
        city: row.city,
        country: row.country,
        description: row.description,
        imageUrl: row.image_url,
        category: row.category,
        bestTimeToVisit: row.best_time_to_visit,
        weather: row.weather,
        entryRequirements: row.entry_requirements,
        averageRating: Number(row.average_rating),
        budgetCategory: row.budget_category,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}

async function getAllDestinationsRepository(query) {

    let sql = `
        SELECT *
        FROM destinations
    `;

    const conditions = [];

    const values = [];

    if (query.search) {

        const placeholder = `$${values.length + 1}`;

        conditions.push(`
            (
                LOWER(name) LIKE LOWER(${placeholder})
                OR LOWER(city) LIKE LOWER(${placeholder})
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

async function getDestinationByIdRepository(destinationId) {

    const result = await pool.query(
        `
        SELECT *
        FROM destinations
        WHERE id = $1;
        `,
        [destinationId]
    );

    return mapDestination(result.rows[0]);
}


export default {
    getAllDestinationsRepository,
    getDestinationByIdRepository,
};