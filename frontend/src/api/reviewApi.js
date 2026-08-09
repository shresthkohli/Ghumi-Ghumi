import apiFetch from "./apiClient";

async function createReview(destinationId, reviewData) {
    const response = await apiFetch(
        `/api/reviews/${destinationId}`,
        {
            method: "POST",
            body: JSON.stringify(reviewData),
        }
    );

    if (response.success) {
        return response.data;
    }

    console.error(response.error);
    return null;
}

async function updateReview(reviewId, reviewData) {
    const response = await apiFetch(
        `/api/reviews/${reviewId}`,
        {
            method: "PATCH",
            body: JSON.stringify(reviewData),
        }
    );

    if (response.success) {
        return response.data;
    }

    console.error(response.error);
    return null;
}

async function deleteReview(reviewId) {
    const response = await apiFetch(
        `/api/reviews/${reviewId}`,
        {
            method: "DELETE",
        }
    );

    if (response.success) {
        return response.data;
    }

    console.error(response.error);
    return null;
}

export default {
    createReview,
    updateReview,
    deleteReview,
};