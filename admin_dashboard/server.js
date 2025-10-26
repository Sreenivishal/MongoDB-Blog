import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";
import Blog from "./models/Blog.js";

const app = express();
const PORT = 3000;

// Set EJS as view engine
app.set("view engine", "ejs");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/blogdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

app.get("/admin", async (req, res) => {
  try {
    const users = await User.find();

    const userData = await Promise.all(users.map(async (user) => {
      const blogCount = await Blog.countDocuments({ author: user._id });
      return {
        username: user.username,
        email: user.email,
        phone: user.phone,
        blogCount
      };
    }));

    res.render("admin", { users: userData });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://127.0.0.1:${PORT}/admin`);
});
