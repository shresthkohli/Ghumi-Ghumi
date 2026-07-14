import apiFetch from "./apiClient";


async function me() {
    return apiFetch(
        "/api/user/me"
    );
}

async function logout(credentials) {
    return apiFetch(
        "/api/user/login",
        {
            method: "POST"
        }
    );
}


export default {
    logout
};
