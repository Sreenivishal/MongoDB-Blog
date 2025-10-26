import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ user, setUser }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
    navigate("/login");
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="bg-sky-500 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">MyBlog</Link>

      <nav className="flex items-center space-x-4">
        <Link to="/" className="hover:text-gray-200">Home</Link>

        {/* Blog category dropdown */}
        <div className="relative dropdown">
  <button
    className="hover:text-gray-200"
    onClick={(e) => {
      e.stopPropagation(); // prevent closing immediately
      setDropdownOpen(!dropdownOpen);
    }}
  >
    Categories
  </button>
  {dropdownOpen && (
    <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow z-10">
      <Link to="/category/travel" className="block px-4 py-2 hover:bg-gray-100">Travel</Link>
      <Link to="/category/technology" className="block px-4 py-2 hover:bg-gray-100">Technology</Link>
      <Link to="/category/food" className="block px-4 py-2 hover:bg-gray-100">Food</Link>
      <Link to="/category/lifestyle" className="block px-4 py-2 hover:bg-gray-100">Lifestyle</Link>
      <Link to="/category/business" className="block px-4 py-2 hover:bg-gray-100">Business</Link>
      <Link to="/category/health" className="block px-4 py-2 hover:bg-gray-100">Health</Link>
      <Link to="/category/education" className="block px-4 py-2 hover:bg-gray-100">Education</Link>
      <Link to="/category/entertainment" className="block px-4 py-2 hover:bg-gray-100">Entertainment</Link>
      <Link to="/category/sports" className="block px-4 py-2 hover:bg-gray-100">Sports</Link>
      <Link to="/category/fashion" className="block px-4 py-2 hover:bg-gray-100">Fashion</Link>
      <Link to="/category/science" className="block px-4 py-2 hover:bg-gray-100">Science</Link>
      <Link to="/category/other" className="block px-4 py-2 hover:bg-gray-100">Other</Link>
    </div>
  )}
</div>


        {user ? (
          <>
            <span className="ml-4">Hello, {user.username}</span>
            <Link to="/dashboard" className="ml-4 hover:text-gray-200">Dashboard</Link>
            <Link to="/add-blog" className="ml-4 hover:text-gray-200">Add Blog</Link>
            <button
              onClick={handleLogout}
              className="ml-4 bg-white text-sky-500 px-3 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-200">Login</Link>
            <Link to="/register" className="hover:text-gray-200">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
