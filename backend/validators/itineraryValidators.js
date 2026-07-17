import { body } from "express-validator";

const createItineraryValidation = [

    body("destinationId")
        .notEmpty()
        .withMessage("Destination is required.")

        .isUUID()
        .withMessage("Invalid destination id."),

    body("title")
        .trim()

        .notEmpty()
        .withMessage("Title is required.")

        .isLength({ max: 100 })
        .withMessage("Title cannot exceed 100 characters."),

    body("description")
        .optional()

        .trim()

        .isLength({ max: 1000 })
        .withMessage("Description cannot exceed 1000 characters.")

];

const updateItineraryValidation = [

    body("destinationId")
        .optional()
        .isUUID()
        .withMessage("Invalid destination id."),

    body("title")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Title cannot be empty.")
        .isLength({ max: 100 })
        .withMessage("Title cannot exceed 100 characters."),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage("Description cannot exceed 1000 characters.")

];


export default {
    createItineraryValidation,
    updateItineraryValidation
};