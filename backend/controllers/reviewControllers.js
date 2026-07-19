import reviewServices from "../services/reviewServices.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createReviewController = asyncHandler(

    async function (req, res) {

        const review =
            await reviewServices
                .createReviewService(
                    req.user.id,
                    req.params.id,
                    req.body
                );

        return res
            .status(201)
            .json(
                ApiResponse.success(
                    "Review created successfully.",
                    review
                )
            );
    }
);

const updateReviewController = asyncHandler(

    async function (req, res) {

        const review =
            await reviewServices
                .updateReviewService(
                    req.user.id,
                    req.params.id,
                    req.body
                );

        return res
            .status(200)
            .json(
                ApiResponse.success(
                    "Review updated successfully.",
                    review
                )
            );

    }

);

const deleteReviewController = asyncHandler(

    async function (req, res) {
        await reviewServices
            .deleteReviewService(

                req.user.id,

                req.params.id

            );

        return res
            .status(200)
            .json(

                ApiResponse.success(
                    "Review deleted successfully.",
                    null
                )

            );
    }
);

export default {
    createReviewController,
    updateReviewController,
    deleteReviewController
};