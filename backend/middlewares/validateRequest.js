import { validationResult } from "express-validator";
import ApiResponse from "../utils/apiResponse.js";

function validateRequest(req, res, next) {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const details = {};

    errors.array().forEach((error) => {
        details[error.path] = error.msg;
    });

    return res
        .status(400)
        .json(
            ApiResponse.error(
                "Validation failed.",
                "VALIDATION_ERROR",
                details
            )
        );
}

export default validateRequest;