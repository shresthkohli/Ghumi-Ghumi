import authRepositories from "../repositories/authRepositories.js";
import bcrypt from "bcrypt";
import AppError from "../errors/AppError.js";
import jwtUtils from "../utils/jwtUtils.js"
import { GoogleAuth } from "google-auth-library";
import googleAuth from "../utils/googleAuth.js";

const SALT_ROUNDS = 10

async function signupService(userData) {
    const existingUser = await authRepositories.findByEmailRepository(userData.email);

    if (existingUser) {
        throw new AppError(
            "Email already exists.",
            409,
            "EMAIL_ALREADY_EXISTS"
        );
    }

    const passwordHash = await bcrypt.hash(
        userData.password,
        SALT_ROUNDS
    );

    const user = await authRepositories.createUserRepository({
        name: userData.name,
        email: userData.email,
        passwordHash
    });

    console.log(user);

    return createLoginResponse(user);
}

async function loginService(credentials) {
    const user = await authRepositories.findByEmailRepository(credentials.email);

    if (!user) {
        throw new AppError(
            "Invalid email or password.",
            401,
            "INVALID_CREDENTIALS"
        );
    }

    const passwordMatch =
        await bcrypt.compare(
            credentials.password,
            user.passwordHash
        );

    if (!passwordMatch) {
        throw new AppError(
            "Invalid email or password.",
            401,
            "INVALID_CREDENTIALS"
        );
    }

    return createLoginResponse(user);
}

function createLoginResponse(user) {

    const token = jwtUtils.generateToken({
        id: user.id
    });

    return {
        user,
        token
    };

}

async function googleLoginService(credential) {

    const payload =
        await googleAuth.verifyGoogleToken(
            credential.trim()
        );

    if (!payload.email_verified) {
        throw new AppError(
            "Google email is not verified.",
            401,
            "EMAIL_NOT_VERIFIED"
        );
    }

    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name;
    const avatarUrl = payload.picture ?? null;

    let user =
        await authRepositories
            .findByGoogleIdRepository(
                googleId
            );

    if (user) {
        return createLoginResponse(user);
    }

    user =
        await authRepositories
            .findByEmailRepository(
                email
            );

    if (user) {

        if (
            user.googleId &&
            user.googleId !== googleId
        ) {

            throw new AppError(
                "This account is already linked to another Google account.",
                409,
                "GOOGLE_ACCOUNT_ALREADY_LINKED"
            );

        }

        user =
            await authRepositories
                .linkGoogleAccountRepository(
                    user.id,
                    googleId,
                    avatarUrl
                );

        return createLoginResponse(user);

    }

    user =
        await authRepositories
            .createGoogleUserRepository({
                name,
                email,
                googleId,
                avatarUrl
            });

    return createLoginResponse(user);

}


export default {
    signupService,
    loginService,
    googleLoginService
}