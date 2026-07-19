import jwtUtils from "../utils/jwtUtils.js";
import AppError from "../errors/AppError.js";

function requireLogin(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return next(
            new AppError(
                "Authentication required.",
                401,
                "UNAUTHORIZED"
            )
        );
    }

    try {
        const payload =
            jwtUtils.verifyToken(token);

        req.user = payload;
        next();
    }

    catch {
        next(
            new AppError(
                "Invalid or expired token.",
                401,
                "INVALID_TOKEN"
            )
        );
    }
}

function optionalLogin(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        req.user = undefined;
        return next();
    }

    try {
        const payload =
            jwtUtils.verifyToken(token);
        req.user = payload;
        next();
    }

    catch {
        req.user = undefined;
        next();
    }
}


export default {
    requireLogin,
    optionalLogin
};