import apiFetch from "./apiClient";


async function me() {
    return apiFetch(
        "/api/user/me"
    );
}

async function logout(credentials) {
    return apiFetch(
        "/api/user/logout",
        {
            method: "POST"
        }
    );
}


export {
    me, logout
};
