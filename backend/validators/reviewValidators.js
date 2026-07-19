import { body } from "express-validator";

const createReviewValidation = [

    body("rating")
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5."),

    body("review")
        .trim()
        .notEmpty()
        .withMessage("Review is required.")
        .isLength({ max: 1000 })
        .withMessage("Review cannot exceed 1000 characters.")

];

const updateReviewValidation = [

    body("rating")
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5."),

    body("review")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Review cannot be empty.")
        .isLength({ max: 1000 })
        .withMessage("Review cannot exceed 1000 characters.")

];

export default {
    createReviewValidation,
    updateReviewValidation
};