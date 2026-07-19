import destinationRepositories from "../repositories/destinationRepositories.js";
import reviewRepositories from "../repositories/reviewRepositories.js";
import AppError from "../errors/AppError.js";

async function createReviewService(
    userId,
    destinationId,
    review
) {

    const destination =
        await destinationRepositories
            .getDestinationByIdRepository(destinationId);

    if (!destination) {
        throw new AppError(
            "Destination not found.",
            404,
            "DESTINATION_NOT_FOUND"
        );
    }

    try {
        const createdReview =
            await reviewRepositories
                .createReviewRepository({
                    userId,
                    destinationId,
                    ...review
                });

        await reviewRepositories.updateDestinationAverageRatingRepository(
                destinationId
            );

        return createdReview;

    }
    catch (error) {

        if (error.code === "23505") {
            throw new AppError(
                "You have already reviewed this destination.",
                409,
                "REVIEW_ALREADY_EXISTS"
            );
        }

        throw error;
    }
}

async function updateReviewService(
    userId,
    reviewId,
    updates
) {

    const review =
        await reviewRepositories
            .getReviewByIdRepository(reviewId);

    if (!review) {
        throw new AppError(
            "Review not found.",
            404,
            "REVIEW_NOT_FOUND"
        );
    }

    if (review.userId !== userId) {
        throw new AppError(
            "Review not found.",
            404,
            "REVIEW_NOT_FOUND"
        );
    }

    const updatedReview = {
        id: review.id,
        userId: review.userId,
        destinationId: review.destinationId,
        rating:
            updates.rating ?? review.rating,
        review:
            updates.review ?? review.review
    };

    const savedReview =
        await reviewRepositories
            .updateReviewRepository(updatedReview);

    await reviewRepositories
        .updateDestinationAverageRatingRepository(
            review.destinationId
        );

    return savedReview;

}

async function deleteReviewService(
    userId,
    reviewId
) {

    const review =
        await reviewRepositories
            .getReviewByIdRepository(reviewId);

    if (!review) {
        throw new AppError(
            "Review not found.",
            404,
            "REVIEW_NOT_FOUND"
        );
    }

    if (review.userId !== userId) {
        throw new AppError(
            "Review not found.",
            404,
            "REVIEW_NOT_FOUND"
        );
    }

    await reviewRepositories
        .deleteReviewRepository(reviewId);

    await reviewRepositories
        .updateDestinationAverageRatingRepository(
            review.destinationId
        );
}

export default {
    createReviewService,
    updateReviewService,
    deleteReviewService
};