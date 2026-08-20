import pool from "../config/db.js";


async function getAllBlogsRepository() {

    const sql = `
        SELECT
            blogs.id,
            blogs.user_id,
            blogs.title,
            blogs.content,
            blogs.created_at,
            blogs.updated_at,

            users.name AS user_name,
            users.avatar_url AS user_avatar_url

        FROM blogs

        INNER JOIN users
            ON users.id = blogs.user_id

        ORDER BY blogs.created_at DESC;
    `;

    const result = await pool.query(sql);

    return result.rows.map(row => ({

        id: row.id,

        userId: row.user_id,

        title: row.title,

        content: row.content,

        user: {
            name: row.user_name,
            avatarUrl: row.user_avatar_url
        },

        createdAt: row.created_at,

        updatedAt: row.updated_at

    }));

}

async function createBlogRepository(
    userId,
    title,
    content
) {
    // We use a CTE (WITH clause) to insert and join in one step
    const sql = `
        WITH inserted_blog AS (
            INSERT INTO blogs (
                user_id,
                title,
                content
            )
            VALUES (
                $1,
                $2,
                $3
            )
            RETURNING
                id,
                user_id,
                title,
                content,
                created_at,
                updated_at
        )
        SELECT 
            inserted_blog.id,
            inserted_blog.user_id,
            inserted_blog.title,
            inserted_blog.content,
            inserted_blog.created_at,
            inserted_blog.updated_at,
            users.name AS user_name,
            users.avatar_url AS user_avatar_url
        FROM inserted_blog
        INNER JOIN users 
            ON users.id = inserted_blog.user_id;
    `;

    const result = await pool.query(
        sql,
        [
            userId,
            title,
            content
        ]
    );

    const row = result.rows[0];

    // Return the exact same nested structure as getAllBlogsRepository
    return {
        id: row.id,
        userId: row.user_id,
        title: row.title,
        content: row.content,
        user: {
            name: row.user_name,
            avatarUrl: row.user_avatar_url
        },
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}

async function updateBlogRepository(
    blogId,
    userId,
    title,
    content
) {
    const sql = `
        WITH updated_blog AS (
            UPDATE blogs
            SET
                title = COALESCE($1, title),
                content = COALESCE($2, content),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $3 AND user_id = $4
            RETURNING
                id,
                user_id,
                title,
                content,
                created_at,
                updated_at
        )
        SELECT 
            updated_blog.id,
            updated_blog.user_id,
            updated_blog.title,
            updated_blog.content,
            updated_blog.created_at,
            updated_blog.updated_at,
            users.name AS user_name,
            users.avatar_url AS user_avatar_url
        FROM updated_blog
        INNER JOIN users 
            ON users.id = updated_blog.user_id;
    `;

    const result = await pool.query(
        sql,
        [
            title || null,   // Converts undefined to null for COALESCE
            content || null, 
            blogId,
            userId
        ]
    );

    // If no rows are returned, it means the blog doesn't exist or the user doesn't own it
    if (result.rows.length === 0) return null;

    const row = result.rows[0];

    return {
        id: row.id,
        userId: row.user_id,
        title: row.title,
        content: row.content,
        user: {
            name: row.user_name,
            avatarUrl: row.user_avatar_url
        },
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}

async function deleteBlogRepository(blogId, userId) {
    const sql = `
        DELETE FROM blogs
        WHERE id = $1 AND user_id = $2
        RETURNING id;
    `;

    const result = await pool.query(sql, [blogId, userId]);

    // If rowCount is 0, it means no blog matched the ID + User ID combo
    return result.rowCount > 0;
}


export default {

    getAllBlogsRepository,
    createBlogRepository,
    updateBlogRepository,
    deleteBlogRepository

};