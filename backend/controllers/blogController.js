import Blog from "../models/Blog.js";
import User from "../models/User.js";

// ✅ Get all blogs
// ✅ Get all blogs (public) with optional category filter
export const getAllBlogs = async (req, res) => {
  try {
    const { category } = req.query; // get category from query params
    let filter = {};
    if (category) {
      filter.category = category; // only filter by category if provided
    }
    const blogs = await Blog.find(filter).populate("author", "username email");
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};


// ✅ Get logged-in user's blogs
export const getUserBlogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const blogs = await Blog.find({ author: userId }).populate("author", "username email");
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch your blogs" });
  }
};

// ✅ Add new blog
export const addBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const userId = req.user.id;

    if (!title || !content || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBlog = new Blog({
      title,
      content,
      category,
      author: userId
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog added successfully", blog: newBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add blog" });
  }
};
