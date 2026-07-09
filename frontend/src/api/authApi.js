import apiFetch from "./apiClient";

async function login(credentials) {
    return apiFetch(
        "/api/auth/login",
        {
            method: "POST",
            body: JSON.stringify(credentials)
        }
    );
}

async function signup(userData) {
    return apiFetch(
        "/api/auth/signup",
        {
            method: "POST",
            body: JSON.stringify(userData)
        }
    );
}

export {
    login,
    signup
};