import destinations from "../data/destinationList.js";

function escapeSql(value) {

    if (value === null || value === undefined) {
        return "NULL";
    }

    return `'${String(value).replace(/'/g, "''")}'`;
}

export async function up(pgm) {

    /*
     * ---------------------------------------------------------
     * DESTINATIONS
     * ---------------------------------------------------------
     *
     * Ignore:
     * - id
     * - isFavorite
     * - isVisited
     * - createdAt
     * - updatedAt
     * - reviews
     * - itineraries
     * - attractions
     *
     * PostgreSQL generates the destination UUID.
     */

    const destinationValues = destinations.map(destination => {

        return `(
            ${escapeSql(destination.name)},
            ${escapeSql(destination.city)},
            ${escapeSql(destination.state)},
            ${escapeSql(destination.country)},
            ${escapeSql(destination.description)},
            ${escapeSql(destination.imageUrl)},
            ${escapeSql(destination.category)},
            ${escapeSql(destination.bestTimeToVisit)},
            ${escapeSql(destination.weather)},
            ${escapeSql(destination.entryRequirements)},
            ${destination.averageRating},
            ${escapeSql(destination.budgetCategory)},
            ${escapeSql(destination.icon)}
        )`;

    });

    pgm.sql(`
        INSERT INTO destinations (
            name,
            city,
            state,
            country,
            description,
            image_url,
            category,
            best_time_to_visit,
            weather,
            entry_requirements,
            average_rating,
            budget_category,
            icon
        )
        VALUES
            ${destinationValues.join(",\n")};
    `);


    /*
     * ---------------------------------------------------------
     * ATTRACTIONS
     * ---------------------------------------------------------
     *
     * destination_id cannot use the IDs from destinationList.js
     * because PostgreSQL generated new UUIDs.
     *
     * Therefore we resolve the destination using its name.
     */

    const attractionValues = [];

    for (const destination of destinations) {

        if (!destination.attractions) {
            continue;
        }

        for (const attraction of destination.attractions) {

            attractionValues.push(`(
                (
                    SELECT id
                    FROM destinations
                    WHERE name = ${escapeSql(destination.name)}
                    LIMIT 1
                ),
                ${escapeSql(attraction.name)},
                ${escapeSql(attraction.description)},
                ${escapeSql(attraction.icon)}
            )`);

        }

    }

    if (attractionValues.length > 0) {

        pgm.sql(`
            INSERT INTO attractions (
                destination_id,
                name,
                description,
                icon
            )
            VALUES
                ${attractionValues.join(",\n")};
        `);

    }

};


export async function down(pgm) {

    /*
     * Remove only the destinations created by this seed.
     *
     * Attractions automatically disappear because
     * destination_id has ON DELETE CASCADE.
     */

    pgm.sql(`
        DELETE FROM destinations
        WHERE name IN (
            ${destinations
                .map(destination => escapeSql(destination.name))
                .join(",\n")}
        );
    `);

};