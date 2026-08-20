import blogRepositories from "../repositories/blogRepositories.js";
import AppError from "../errors/AppError.js";


async function getAllBlogsService() {

    const blogs =
        await blogRepositories
            .getAllBlogsRepository();

    return blogs;

}

async function createBlogService(userId, title, content) {
    // Note: If you need business logic (e.g., checking if the user is 
    // allowed to post, or sanitizing the content), it goes right here.

    try {
        const newBlog = await blogRepositories.createBlogRepository(
            userId, 
            title, 
            content
        );
        
        return newBlog;
    } catch (error) {
        console.log(error);
        // Wrapping the DB error in your custom AppError so your 
        // errorHandler middleware handles it gracefully.
        throw new AppError(
            "Failed to create the blog post.", 
            500, 
            "BLOG_CREATION_FAILED"
        );
    }
}

async function updateBlogService(blogId, userId, title, content) {
    try {
        const updatedBlog = await blogRepositories.updateBlogRepository(
            blogId, 
            userId, 
            title, 
            content
        );

        // Handle the case where the update didn't affect any rows
        if (!updatedBlog) {
            throw new AppError(
                "Blog not found or you are not authorized to update it.", 
                404, 
                "BLOG_NOT_FOUND_OR_UNAUTHORIZED"
            );
        }
        
        return updatedBlog;
    } catch (error) {
        // If it's already an AppError (like our 404 above), just throw it up the chain
        if (error instanceof AppError) throw error;

        console.error("Database Error:", error);
        
        throw new AppError(
            "Failed to update the blog post.", 
            500, 
            "BLOG_UPDATE_FAILED"
        );
    }
}

async function deleteBlogService(blogId, userId) {
    try {
        const isDeleted = await blogRepositories.deleteBlogRepository(blogId, userId);

        if (!isDeleted) {
            throw new AppError(
                "Blog not found or you are not authorized to delete it.", 
                404, 
                "BLOG_NOT_FOUND_OR_UNAUTHORIZED"
            );
        }
        
        return true;
    } catch (error) {
        if (error instanceof AppError) throw error;

        console.error("Database Error:", error);
        
        throw new AppError(
            "Failed to delete the blog post.", 
            500, 
            "BLOG_DELETION_FAILED"
        );
    }
}


export default {
    getAllBlogsService,
    createBlogService,
    updateBlogService,
    deleteBlogService
};