import ApiResponse from "../utils/apiResponse.js";
import AppError from "../errors/AppError.js";

function errorHandler(error, req, res, next) {
    if (error instanceof AppError) {
        return res
            .status(error.statusCode)
            .json(
                ApiResponse.error(
                    error.message,
                    error.code,
                    error.details
                )
            );
    }

    console.error(error);

    return res
        .status(500)
        .json(
            ApiResponse.error(
                "Internal server error.",
                "INTERNAL_SERVER_ERROR"
            )
        );
}

export default errorHandler;