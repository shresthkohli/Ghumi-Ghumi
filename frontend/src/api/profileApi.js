import apiFetch from "./apiClient";

async function getProfile() {
    const response = await apiFetch("/api/profile");
    
    if (response.success) {
        return response.data;
    }
    else {
        console.error(response.error);
    }
}

export default {
    getProfile
};