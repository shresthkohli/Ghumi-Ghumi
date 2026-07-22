import pool from "../config/db.js";
import destinationRepositories from "./destinationRepositories.js";


async function addFavoriteRepository(
    userId,
    destinationId
) {

    await pool.query(
        `
        INSERT INTO favorite_destinations (
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

async function removeFavoriteRepository(
    userId,
    destinationId
) {

    await pool.query(
        `
        DELETE FROM favorite_destinations
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

async function getFavoritesRepository(
    userId
) {

    const result =
        await pool.query(
            `
            SELECT
                destinations.*
            FROM favorite_destinations

            INNER JOIN destinations
            ON
                destinations.id =
                favorite_destinations.destination_id

            WHERE
                favorite_destinations.user_id = $1

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
    addFavoriteRepository,
    removeFavoriteRepository,
    getFavoritesRepository
}