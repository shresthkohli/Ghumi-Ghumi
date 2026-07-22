import pool from "../config/db.js";
import destinationRepositories from "./destinationRepositories.js";


async function addVisitedRepository(
    userId,
    destinationId
) {

    await pool.query(
        `
        INSERT INTO visited_destinations (
            user_id,
            destination_id
        )
        VALUES (
            $1,
            $2
        );
        `,
        [
            userId,
            destinationId
        ]
    );
}

async function removeVisitedRepository(
    userId,
    destinationId
) {

    await pool.query(
        `
        DELETE FROM visited_destinations
        WHERE
            user_id = $1
            AND destination_id = $2;
        `,
        [
            userId,
            destinationId
        ]
    );
}

async function getVisitedRepository(
    userId
) {

    const result =
        await pool.query(
            `
            SELECT
                destinations.*
            FROM visited_destinations

            INNER JOIN destinations
            ON
                destinations.id =
                visited_destinations.destination_id

            WHERE
                visited_destinations.user_id = $1

            ORDER BY
                destinations.name;
            `,
            [userId]
        );

    return result.rows.map(
        destinationRepositories.mapDestination
    );

}


export default {
    addVisitedRepository,
    removeVisitedRepository,
    getVisitedRepository
};