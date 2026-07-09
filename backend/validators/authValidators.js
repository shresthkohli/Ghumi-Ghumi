import {body} from "express-validator";

const signupValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required!")
        .bail()
        .isEmail()
        .withMessage("Please enter a valid Email!"),

    body("password")
        .notEmpty()
        .withMessage("Password is required!!")
        .bail()
        .isLength({min: 8})
        .withMessage("Password must be atleast 8 characters long")
];

const loginValidation = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Please enter a valid Email!"),

    body("password")
        .notEmpty()
        .withMessage("Password is required.")
];

export default {
    signupValidation,
    loginValidation
};