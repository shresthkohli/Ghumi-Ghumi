import pool from "../config/db.js";

function mapReview(row) {

    if (!row) {
        return null;
    }

    return {
        id: row.id,
        userId: row.user_id,
        destinationId: row.destination_id,
        rating: row.rating,
        review: row.review,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };

}

function mapDestinationReview(row) {

    if (!row) {
        return null;
    }

    return {
        id: row.id,
        userId: row.user_id,
        userName: row.user_name,
        destinationId: row.destination_id,
        rating: row.rating,
        review: row.review,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };

}

async function createReviewRepository(review) {

    const result = await pool.query(
        `
        INSERT INTO reviews (
            user_id,
            destination_id,
            rating,
            review
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
            review.userId,
            review.destinationId,
            review.rating,
            review.review
        ]
    );

    return mapReview(result.rows[0]);
}

async function updateDestinationAverageRatingRepository(destinationId) {

    await pool.query(
        `
        UPDATE destinations
        SET
            average_rating = (
                SELECT
                    COALESCE(AVG(rating), 0)
                FROM reviews
                WHERE destination_id = $1
            )
        WHERE id = $1;
        `,
        [destinationId]
    );

}

async function getReviewByIdRepository(reviewId) {

    const result = await pool.query(
        `
        SELECT *
        FROM reviews
        WHERE id = $1;
        `,
        [reviewId]
    );

    return mapReview(result.rows[0]);

}

async function updateReviewRepository(review) {

    const result = await pool.query(
        `
        UPDATE reviews
        SET
            rating = $1,
            review = $2,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
        RETURNING *;
        `,
        [
            review.rating,
            review.review,
            review.id
        ]
    );

    return mapReview(result.rows[0]);

}

async function deleteReviewRepository(reviewId) {

    await pool.query(
        `
        DELETE
        FROM reviews
        WHERE id = $1;
        `,
        [reviewId]
    );

}

async function getReviewsForDestinationRepository(destinationId) {

    const result = await pool.query(
        `
        SELECT
            reviews.*,
            users.name AS user_name
        FROM reviews
        JOIN users
            ON users.id = reviews.user_id
        WHERE reviews.destination_id = $1
        ORDER BY reviews.created_at DESC;
        `,
        [destinationId]
    );

    return result.rows.map(mapDestinationReview);

}


export default {
    createReviewRepository,
    updateDestinationAverageRatingRepository,
    getReviewByIdRepository,
    updateReviewRepository,
    deleteReviewRepository,
    getReviewsForDestinationRepository
};