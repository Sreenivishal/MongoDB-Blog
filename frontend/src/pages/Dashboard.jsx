import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/blogs/myblogs", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBlogs(res.data);
      } catch (err) {
        console.error(err.response?.data || err);
      }
    };

    fetchMyBlogs();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">My Blogs</h2>
      {blogs.length === 0 && <p>No blogs yet</p>}
      {blogs.map(blog => (
        <div key={blog._id} className="border p-4 mb-3 rounded shadow">
          <h3 className="text-xl font-semibold">{blog.title}</h3>
          <p className="text-gray-700">{blog.content}</p>
          <p className="text-sm text-gray-500">Category: {blog.category}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
