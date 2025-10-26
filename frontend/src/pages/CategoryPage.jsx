import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchCategoryBlogs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/blogs?category=${categoryName}`
        );
        setBlogs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategoryBlogs();
  }, [categoryName]);

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">
        {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Blogs
      </h2>
      {blogs.length === 0 ? (
        <p>No blogs available in this category.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} className="border p-4 mb-4 rounded shadow">
            <h3 className="font-semibold">{blog.title}</h3>
            <p>{blog.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CategoryPage;
