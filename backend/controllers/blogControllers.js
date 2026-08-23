import blogServices from "../services/blogServices.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js"; 

async function getAllBlogsController(req, res) {
    const blogs =
        await blogServices
            .getAllBlogsService();

    return res
        .status(200)
        .json(
            ApiResponse.success(
                "Blogs fetched successfully.",
                blogs
            )
        );
}

// Wrap it directly in your asyncHandler
const createBlogController = asyncHandler(async (req, res) => {
    // 1. Extract data from the validated request body
    const { title, content } = req.body;

    // 2. Get the user ID from the token payload 
    // (Assuming your jwt payload includes 'id'. If it's something else like 'userId', update accordingly)
    const userId = req.user.id;

    // 3. Call the service
    const newBlog = await blogServices.createBlogService(
        userId,
        title,
        content
    );

    // 4. Send a 201 Created response
    return res
        .status(201)
        .json(
            ApiResponse.success(
                "Blog created successfully.",
                newBlog
            )
        );
});

// Wrap the new controller in your asyncHandler
const updateBlogController = asyncHandler(async (req, res) => {
    // 1. Extract the blog ID from the URL path
    const { id } = req.params;

    // 2. Extract the optional fields from the validated request body
    const { title, content } = req.body;

    // 3. Get the user ID from the token payload
    const userId = req.user.id;

    // 4. Call the service
    const updatedBlog = await blogServices.updateBlogService(
        id,
        userId,
        title,
        content
    );

    // 5. Send a 200 OK response with the updated data
    return res
        .status(200)
        .json(
            ApiResponse.success(
                "Blog updated successfully.",
                updatedBlog
            )
        );
});

const deleteBlogController = asyncHandler(async (req, res) => {
    // 1. Extract the blog ID from the URL path
    const { id } = req.params;

    // 2. Get the user ID from the token payload
    const userId = req.user.id;

    // 3. Call the service
    await blogServices.deleteBlogService(id, userId);

    // 4. Send a 200 OK response
    return res
        .status(200)
        .json(
            ApiResponse.success(
                "Blog deleted successfully."
            )
        );
});


export default {
    getAllBlogsController,
    createBlogController,
    updateBlogController,
    deleteBlogController
};