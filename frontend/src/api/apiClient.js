const API_URL = import.meta.env.VITE_API_URL ?? "";

async function apiFetch(endpoint, options = {}) {
    let response;

    try {
        response = await fetch(
            `${API_URL}${endpoint}`,
            {
                credentials: "include",

                headers: {
                    "Content-Type": "application/json",
                    ...options.headers
                },

                ...options
            }
        );
    }
    catch {
        throw {
            success: false,
            message: "Unable to connect to the server.",
            data: null,
            error: {
                code: "NETWORK_ERROR"
            }
        };
    }

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
}

export default apiFetch;