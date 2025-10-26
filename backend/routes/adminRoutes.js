import express from "express";
import { getAllUsers, getAllBlogs } from "../controllers/adminController.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.js";

const router = express.Router();
router.get("/users", verifyToken, verifyAdmin, getAllUsers);
router.get("/blogs", verifyToken, verifyAdmin, getAllBlogs);

export default router;
