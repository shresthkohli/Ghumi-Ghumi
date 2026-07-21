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

async function googleLogin(
    credential
) {

    return apiFetch(
        "/api/auth/googleLogin",
        {
            method: "POST",
            body: JSON.stringify({
                credential
            })
        }
    );
}


export {
    login,
    signup,
    googleLogin
};