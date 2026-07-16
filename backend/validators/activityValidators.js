import { body } from "express-validator";


const createActivityValidation = [

    body("dayNumber")
        .isInt({ min: 1 })
        .withMessage("Day number must be at least 1."),

    body("position")
        .isInt({ min: 1 })
        .withMessage("Position must be at least 1."),

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
        .withMessage("Description cannot exceed 1000 characters."),

    body("startTime")
        .optional()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage("Start time must be in HH:MM format."),

    body("endTime")
        .optional()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage("End time must be in HH:MM format.")

];


export default {
    createActivityValidation
};