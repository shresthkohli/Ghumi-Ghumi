import apiFetch from "./apiClient";

async function getAllBlogs() {
    const response = await apiFetch("/api/blogs");

    if (response.success) {
        return response.data;
    }
    else {
        console.error(response.error);
    }
}

async function createBlog(blogData) {
    const response = await apiFetch(
        "/api/blogs",
        {
            method: "POST",
            body: JSON.stringify(blogData),
        }
    );

    if (response.success) {
        return response.data;
    }

    console.error(response.error);
    return null;
}

async function updateBlog(id, blogData) {
    const response = await apiFetch(
        `/api/blogs/${id}`,
        {
            method: "PATCH",
            body: JSON.stringify(blogData),
        }
    );

    if (response.success) {
        return response.data;
    }

    console.error(response.error);
    return null;
}

async function deleteBlog(id) {
    const response = await apiFetch(
        `/api/blogs/${id}`,
        {
            method: "DELETE",
        }
    );

    if (response.success) {
        return response.data;
    }

    console.error(response.error);
    return null;
}

export default {
    getAllBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
};
