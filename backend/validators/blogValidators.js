import { body } from "express-validator";

const createBlogValidation = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required.")
        .isLength({ max: 255 }) // Standard max length for a VARCHAR column
        .withMessage("Title cannot exceed 255 characters."),

    body("content")
        .trim()
        .notEmpty()
        .withMessage("Content is required.")
        .isLength({ min: 10 }) // Ensures the blog has at least *some* substance
        .withMessage("Content must be at least 10 characters long.")
];

const updateBlogValidation = [
    body("title")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Title cannot be empty.")
        .isLength({ max: 255 })
        .withMessage("Title cannot exceed 255 characters."),

    body("content")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Content cannot be empty.")
        .isLength({ min: 10 })
        .withMessage("Content must be at least 10 characters long.")
];

export default {
    createBlogValidation,
    updateBlogValidation
};