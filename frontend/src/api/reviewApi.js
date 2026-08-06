import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function getAuthHeaders()
{
    const token= localStorage.getItem("token");
    
    return{
        headers:{
            Authorization : `Bearer ${token}`,
        },
    };
}

async function createReview(destinationId , reviewData) {
    const response = await axios.post(
        `${API_URL}/reviews/${destinationId}`,
        reviewData,
        getAuthHeaders()
    )
    return response.data.data;
}

async function updateReview(reviewId , reviewData) {
     const response = await axios.patch(
        `${API_URL}/reviews/${reviewId}`,
        reviewData,
        getAuthHeaders()
    )
    return response.data.data;
}

async function deleteReview(reviewId) {
     const response = await axios.delete(
        `${API_URL}/reviews/${reviewId}`,
        getAuthHeaders()
    )
    return response.data.data;
}

export default {
    createReview,
    updateReview,
    deleteReview,
};
