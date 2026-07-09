import AppError from "../errors/AppError.js";
import userRepositories from "../repositories/userRepositories.js";

async function meService(userId) {

    const user =
        await userRepositories.findByIdRepository(userId);

    if (!user) {

        throw new AppError(
            "User not found.",
            404,
            "USER_NOT_FOUND"
        );

    }

    return user;

}

function testService() {
    return ({
        success: true,
        message: "User Services wired!!"
    })
}

export default {
    testService,
    meService
};