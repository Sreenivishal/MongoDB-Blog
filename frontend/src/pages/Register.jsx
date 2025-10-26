import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        { username, email, phone, password },
        { headers: { "Content-Type": "application/json" } }
      );

      alert(res.data.message);

      // Redirect to login after successful registration
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 border p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full mb-3"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-3"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 w-full mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-3"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-2 w-full mb-3"
          required
        />
        <button className="bg-sky-600 text-white w-full py-2 rounded">
          Register
        </button>
      </form>
      <p className="text-center mt-3 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-sky-600 font-semibold">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;
