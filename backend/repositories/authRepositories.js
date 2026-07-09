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


async function findByEmailRepository(email) {
    const result = await pool.query(
        `
        SELECT
            id,
            name,
            email,
            password_hash,
            created_at,
            updated_at
        FROM users
        WHERE email = $1
        `,
        [email]
    );

    return mapUser(result.rows[0]);
}

async function createUserRepository(userData) {
    const result = await pool.query(
        `
        INSERT INTO users (
            name,
            email,
            password_hash
        )
        VALUES (
            $1,
            $2,
            $3
        )
        RETURNING
            id,
            name,
            email,
            created_at,
            updated_at           
        `,
        [
            userData.name,
            userData.email,
            userData.passwordHash
        ]
    );

    return mapUser(result.rows[0]);
}

export default {
    findByEmailRepository,
    createUserRepository,
};