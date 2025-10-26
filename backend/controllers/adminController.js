import User from "../models/User.js";
import Blog from "../models/Blog.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find().populate("author", "username email");
  res.json(blogs);
};
