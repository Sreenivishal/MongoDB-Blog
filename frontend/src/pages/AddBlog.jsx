import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("other");
  const navigate = useNavigate();

  const handleAddBlog = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in");

    try {
      await axios.post(
        "http://localhost:5000/api/blogs",
        { title, content, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Blog added successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Failed to add blog");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 border p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add New Blog</h2>
      <form onSubmit={handleAddBlog}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-3"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full mb-3"
          rows={5}
          required
        />
        <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full mb-3"
        required
        >
            <option value="">Select Category</option>
            <option value="travel">Travel</option>
            <option value="technology">Technology</option>
            <option value="food">Food</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="sports">Sports</option>
            <option value="fashion">Fashion</option>
            <option value="science">Science</option>
            <option value="other">Other</option>
            </select>

        <button className="bg-sky-600 text-white w-full py-2 rounded">Add Blog</button>
      </form>
    </div>
  );
};

export default AddBlog;
