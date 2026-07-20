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
        googleId: row.google_id,
        avatarUrl: row.avatar_url,
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

async function findByGoogleIdRepository(googleId) {

    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE google_id = $1;
        `,
        [googleId]
    );

    return mapUser(result.rows[0]);

}

async function createGoogleUserRepository(user) {

    const result = await pool.query(
        `
        INSERT INTO users (
            name,
            email,
            google_id,
            avatar_url
        )
        VALUES (
            $1,
            $2,
            $3,
            $4
        )
        RETURNING *;
        `,
        [
            user.name,
            user.email,
            user.googleId,
            user.avatarUrl
        ]
    );

    return mapUser(result.rows[0]);

}

async function linkGoogleAccountRepository(
    userId,
    googleId,
    avatarUrl
) {

    const result = await pool.query(
        `
        UPDATE users
        SET
            google_id = $1,
            avatar_url = $2,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
        RETURNING *;
        `,
        [
            googleId,
            avatarUrl,
            userId
        ]
    );

    return mapUser(result.rows[0]);

}


export default {
    findByEmailRepository,
    createUserRepository,
    findByGoogleIdRepository,
    createGoogleUserRepository
};