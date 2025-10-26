import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddBlog from "./pages/AddBlog";
import CategoryPage from "./pages/CategoryPage";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token && username) setUser({ username });
  }, []);

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-blog" element={<AddBlog />} />
        {/* Adding key here forces remount on category change */}
        <Route
          path="/category/:categoryName"
          element={<CategoryPage key={window.location.pathname} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
