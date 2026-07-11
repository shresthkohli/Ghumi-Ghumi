import destinations from "../data/destinations.js";

function escapeSql(value) {
    return String(value).replace(/'/g, "''");
}

export const up = (pgm) => {

    for (const destination of destinations) {

        pgm.sql(`
            INSERT INTO destinations (
                name,
                city,
                country,
                description,
                image_url,
                category,
                best_time_to_visit,
                weather,
                entry_requirements,
                average_rating,
                budget_category
            )
            VALUES (
                '${escapeSql(destination.name)}',
                '${escapeSql(destination.city)}',
                '${escapeSql(destination.country)}',
                '${escapeSql(destination.description)}',
                '${escapeSql(destination.imageUrl)}',
                '${escapeSql(destination.category)}',
                '${escapeSql(destination.bestTimeToVisit)}',
                '${escapeSql(destination.weather)}',
                '${escapeSql(destination.entryRequirements)}',
                ${destination.averageRating},
                '${escapeSql(destination.budgetCategory)}'
            );
        `);

    }
};

export const down = (pgm) => {
    pgm.sql(`
        DELETE FROM destinations;
    `);
};