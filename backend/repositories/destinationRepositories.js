import pool from "../config/db.js";

function mapDestination(row) {
    if (!row) {
        return null;
    }

    return {
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

async function getAllDestinationsRepository() {
    const result = await pool.query(
        `
        SELECT
            id,
            name,
            city,
            country,
            image_url,
            category,
            average_rating,
            best_time_to_visit,
            weather,
            budget_category
        FROM destinations
        ORDER BY average_rating DESC;
        `
    );

    return result.rows.map(mapDestination);
}

export default {
    getAllDestinationsRepository
};