import express from "express";
import { getAllBlogs, getUserBlogs, addBlog } from "../controllers/blogController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Get all blogs (public)
router.get("/", getAllBlogs);

// Get logged-in user's blogs
router.get("/myblogs", verifyToken, getUserBlogs);

// Add new blog (only logged-in users)
router.post("/", verifyToken, addBlog);

export default router;
