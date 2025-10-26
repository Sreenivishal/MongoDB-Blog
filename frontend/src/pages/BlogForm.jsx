import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BlogForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "Technology",
  });
  const [username, setUsername] = useState("");

  // Get logged-in username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      // If no user logged in, redirect to login
      navigate("/login");
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Get JWT token

    axios.post(
      "http://localhost:5000/api/blogs",
      { ...form, author: username },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send token
        },
      }
    )
      .then(() => {
        alert("✅ Blog created successfully!");
        navigate("/"); // Redirect to home after creation
      })
      .catch((err) => {
        console.error(err);
        alert("❌ Failed to create blog. Make sure you are logged in.");
      });
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded-lg border mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Create a New Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full p-2 border rounded h-32"
          required
        />

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option>Technology</option>
          <option>Travel</option>
          <option>Food</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
}
