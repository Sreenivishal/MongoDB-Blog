import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [loginId, setLoginId] = useState(""); // email or username
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { loginId, password },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.username);
      setUser(res.data.user);
      alert("Login successful");
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 border p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email or Username"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          className="border p-2 w-full mb-3"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-3"
          required
        />
        <button className="bg-sky-600 text-white w-full py-2 rounded">
          Login
        </button>
      </form>
      <p className="text-center mt-3 text-sm">
        New user?{" "}
        <Link to="/register" className="text-sky-600 font-semibold">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
