import pool from "../config/db.js";

function mapUser(row) {

    if (!row) {
        return null;
    }

    return {
        id: row.id,
        name: row.name,
        email: row.email,
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

export default {
    findByIdRepository
};