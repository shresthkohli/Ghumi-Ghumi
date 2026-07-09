import authRepositories from "../repositories/authRepositories.js";
import bcrypt from "bcrypt";
import AppError from "../errors/AppError.js";
import jwtUtils from "../utils/jwtUtils.js"

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

    return user;
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

    console.log(user);

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

    const token = jwtUtils.generateToken({
        id: user.id
    });

    return {
        user,
        token
    };
}

export default {
    signupService,
    loginService
}