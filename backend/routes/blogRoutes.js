import express from "express";
import blogControllers from "../controllers/blogControllers.js";
import blogValidators from "../validators/blogValidators.js";

// Make sure these paths match exactly where your middlewares live
import authMiddleware from "../middlewares/authMiddleware.js"; 
import validateRequest from "../middlewares/validateRequest.js";

const router = express.Router();

// GET all blogs
router.get(
    "/",
    blogControllers.getAllBlogsController
);

// POST a new blog
router.post(
    "/",
    authMiddleware.requireLogin,          // 1. Check if the user is authenticated
    blogValidators.createBlogValidation,  // 2. Run the validation rules
    validateRequest,                      // 3. Check for errors and format them if they exist
    blogControllers.createBlogController  // 4. Finally, execute the controller logic
);

// PATCH (Update) an existing blog
router.patch(
    "/:id",
    authMiddleware.requireLogin,          // 1. Must be logged in
    blogValidators.updateBlogValidation,  // 2. Validate optional title/content
    validateRequest,                      // 3. Catch validation errors
    blogControllers.updateBlogController  // 4. Execute the controller
);

// DELETE an existing blog
router.delete(
    "/:id",
    authMiddleware.requireLogin,          // 1. Must be logged in
    blogControllers.deleteBlogController  // 2. Execute the controller
);


export default router;