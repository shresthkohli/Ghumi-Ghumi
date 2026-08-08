import pool from "../config/db.js";


function mapAttraction(row) {

    if (!row) {
        return null;
    }

    return {
        id: row.id,
        name: row.name,
        description: row.description,
        icon: row.icon
    };

}

async function getAttractionsRepository(destinationId) {

    const result = await pool.query(
        `
        SELECT *
        FROM attractions
        WHERE destination_id = $1
        ORDER BY name;
        `,
        [destinationId]
    );

    return result.rows.map(
        mapAttraction
    );

}


export default {
    getAttractionsRepository
};