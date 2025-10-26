import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const query = new URLSearchParams(useLocation().search);
  const category = query.get("category");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/blogs${category ? `?category=${category}` : ""}`)
      .then((res) => setBlogs(res.data))
      .catch(console.error);
  }, [category]);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">{category ? `${category} Blogs` : "All Blogs"}</h2>
      {blogs.map((b) => (
        <div key={b._id} className="border p-3 mb-3 rounded">
          <h3 className="text-lg font-bold">{b.title}</h3>
          <p>{b.content}</p>
          <small>By {b.author?.username || "Unknown"}</small>
        </div>
      ))}
    </div>
  );
};

export default Home;
