import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Blog from "./models/Blog.js"; // your Blog schema

// MongoDB connection
const DB_URL = "mongodb://127.0.0.1:27017/blogdb_new";

mongoose.connect(DB_URL)
  .then(() => console.log("MongoDB connected to blogdb_new"))
  .catch(err => console.error("MongoDB connection error:", err));

const categories = ["Technology", "Food", "Travel", "Lifestyle", "Business", "Other"];
const authors = ["John Doe", "Jane Smith", "Alice Wang", "Bob Kumar", "Charlie M."];

async function generateBlogs(blogCount = 500) {
  try {
    await Blog.deleteMany({}); // clear previous blogs

    const blogs = [];

    for (let i = 0; i < blogCount; i++) {
      const blog = new Blog({
        title: faker.hacker.phrase(), // makes it feel techy/meaningful
        content: faker.lorem.paragraphs(3),
        category: faker.helpers.arrayElement(categories),
        author: faker.helpers.arrayElement(authors),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      });
      blogs.push(blog);
    }

    await Blog.insertMany(blogs);
    console.log(`${blogCount} blogs generated successfully!`);
    process.exit(0);
  } catch (err) {
    console.error("Error generating blogs:", err);
    process.exit(1);
  }
}

generateBlogs();
